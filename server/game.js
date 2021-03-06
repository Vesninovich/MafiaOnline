const Player = require('./player');
const states = require('./states');
const texts = require('./texts.json');

const MIN_PLAYERS = 4;

let players = [];
let playerId = 0;
let messageId = 0;

let gameState = states.WAIT_START;

function checkReadyVotes() {
    const countReady = players.reduce((countReady, player) =>
        countReady + +(player.status === Player.statuses.READY),
        0
    );

    if (countReady >= players.length && countReady >= MIN_PLAYERS) {
        sendMessage(texts.game_start);
        startCountdown(startGame);
    }
    else if (countDown) {
        stopCountdown();
        sendMessage(texts.countdown_stop);
    }
}

function checkContinueVotes() {
    const countReady = players.reduce((countReady, player) =>
        countReady + player.votes.length,
        0
    );

    const activeCount = players.reduce((activeCount, player) =>
        activeCount + +(player.status === Player.statuses.ACTIVE),
        0
    );

    const whoDies = checkWhoDies();

    if (whoDies && countReady >= activeCount) {
        if (gameState === states.MAFIA) {
            sendMessage(texts.mafia_voted);
            startCountdown(switchToDay);
        }
        else if (gameState === states.CIVILIANS) {
            sendMessage(texts.civilians_voted);
            startCountdown(switchToNight);
        }
    }
    else if (countDown) {
        stopCountdown();
        sendMessage(texts.countdown_stop);
    }
}

function clearVotes() {
    players.forEach(player => {
        player.votes = [];
        updatePlayer(player);
    });
}

function checkWhoDies() {
    let mostVoted = players[0];
    for (const player of players) {
        if (player.votes.length > mostVoted.votes.length) {
            mostVoted = player;
        }
    }
    for (const player of players) {
        if (mostVoted !== player &&
            mostVoted.votes.length === player.votes.length) {
            return null;
        }
    }
    return mostVoted;
}

let countDownCount = 5;
let countDown = null;
let currentToWhat = null;

function startCountdown(toWhat) {
    if (countDown && toWhat !== currentToWhat) {
        stopCountdown();
    }
    countDown = setTimeout(() => {
        if (countDownCount > 0) {
            countDownCount--;
            sendMessage(`${countDownCount}...`);
            currentToWhat = toWhat;
            startCountdown(toWhat);
        }
        else {
            stopCountdown();
            toWhat();
        }
    }, 1000);
}

function stopCountdown() {
    if (countDown) {
        clearTimeout(countDown);
    }
    countDown = null;
    countDownCount = 5;
}

function startGame() {
    generateRoles(players.length).forEach((role, index) => {
        players[index].role = role;
        updatePlayer(players[index]);
    });
    switchToNight();
}

function switchToNight() {
    if (gameState === states.WAIT_START || gameState === states.CIVILIANS) {
        if (gameState === states.CIVILIANS) {
            const dead = checkWhoDies();
            killPlayer(dead);
            clearVotes();
            sendMessage(dead.name + texts.was_hanged);
            if (dead.role === Player.roles.MAFIA) {
                sendMessage(texts.was_mafia);
            }
            else {
                sendMessage(texts.was_civilian);
            }
        }
        gameState = states.MAFIA;
        sendDataToAll({ type: 'SET_STATE', gameState });
        players.forEach(player => {
            if (player.status !== Player.statuses.DEAD) {
                if (player.role === Player.roles.CIVILIAN) {
                    player.status = Player.statuses.INACTIVE;
                }
                else if (player.role === Player.roles.MAFIA) {
                    player.status = Player.statuses.ACTIVE;
                }
                updatePlayer(player);
            }
        });
        if (!checkEnd()) {
            sendMessage(texts.mafia_turn);
        }
    }
}

function switchToDay() {
    if (gameState === states.MAFIA) {
        const dead = checkWhoDies();
        killPlayer(dead);
        clearVotes();
        sendMessage(dead.name + texts.was_killed);
        gameState = states.CIVILIANS;
        sendDataToAll({ type: 'SET_STATE', gameState });
        players.forEach(player => {
            if (player.status !== Player.statuses.DEAD) {
                    player.status = Player.statuses.ACTIVE;
                    updatePlayer(player);
                }
        });
        if (!checkEnd()) {
            sendMessage(texts.civilians_turn);
        }
    }
}

function checkEnd() {
    const counts = players.reduce((counts, player) => {
        return {
            civs: counts.civs + +(
                player.role === Player.roles.CIVILIAN &&
                player.status !== Player.statuses.DEAD),
            mafia: counts.mafia + +(
                player.role === Player.roles.MAFIA &&
                player.status !== Player.statuses.DEAD)
        }
    }, { civs: 0, mafia: 0 });
    if (counts.civs <= counts.mafia) {
        endGame(Player.roles.MAFIA);
        return true;
    }
    if (counts.mafia === 0) {
        endGame(Player.roles.CIVILIAN);
        return true;
    }
    return false;
}

function endGame(whoWon) {
    players.forEach(player => killPlayer(player));
    if (whoWon === Player.roles.MAFIA) {
        sendMessage(texts.mafia_win);
    }
    if (whoWon === Player.roles.CIVILIAN) {
        sendMessage(texts.civilians_win);
    }
    sendMessage(texts.game_end);
    gameState = states.END;
    sendDataToAll({ type: 'SET_STATE', gameState });
    restartGame();
}

function restartGame() {
    players.forEach(player => player.socket.close());
    playerId = 0;
    messageId = 0;
    gameState = states.WAIT_START;
}

function generateRoles(count) {
    let mafia = Math.floor(count / 3);
    const roles = new Array(count);
    for (let i = 0; i < roles.length; i++) {
        if (mafia > 0) {
            mafia--;
            roles[i] = Player.roles.MAFIA;
        }
        else {
            roles[i] = Player.roles.CIVILIAN;
        }
    }
    return shuffle(roles);
}

function shuffle(arr) {
    let index = arr.length;
    while (index > 0) {
        randIndex = Math.floor(Math.random() * index--);
        let tmp = arr[randIndex];
        arr[randIndex] = arr[index];
        arr[index] = tmp;
    }
    return arr;
}

function addPlayer(name, socket) {
    const player = new Player(++playerId, name, socket);
    
    player.send({
        type: 'JOIN_GAME',
        player: {
            id: playerId,
            name
        }
    });
    player.send({
        type: 'SET_STATE',
        gameState
    });
    players.forEach(another => player.send({
        type: 'ADD_PLAYER',
        player: another.data()
    }));

    players.push(player);
    sendDataToAll({
        type: 'ADD_PLAYER',
        player: player.data()
    });
    sendMessage(name + texts.joined_game);
}

function removePlayer(id) {
    const index = players.findIndex(player => player.id === id);
    const name = players[index];
    players.splice(index, 1);
    sendDataToAll({
        type: 'REMOVE_PLAYER',
        player: {
            id
        }
    });
    sendMessage(name + texts.left_game);
}

function killPlayer(player) {
    if (player) {
        player.status = Player.statuses.DEAD;
        updatePlayer(player);
    }
}

function updatePlayer(player) {
    sendDataToAll({
        type: 'UPDATE_PLAYER',
        player: player.data()
    });
}

function setVote(idFrom, idFor) {
    players.forEach(player => {
        const index = player.votes.findIndex(vote => vote === idFrom);
        if (player.id === idFor && index === -1 &&
            player.status !== Player.statuses.DEAD) {
            player.votes.push(idFrom);
            updatePlayer(player);
        }
        else if (index !== -1) {
            player.votes.splice(index, 1);
            updatePlayer(player);
        }
    });
}

function canVote(id) {
    const player = players.find(player => player.id === id);
    return player && player.status === Player.statuses.ACTIVE;
}

function switchPlayerReady(id) {
    if (gameState === states.WAIT_START) {
        const player = players.find(player => player.id === id);
        if (player) {
            if (player.status === Player.statuses.NOT_READY) {
                player.status = Player.statuses.READY;
                updatePlayer(player);
            }
            else if (player.status === Player.statuses.READY) {
                player.status = Player.statuses.NOT_READY;
                updatePlayer(player);
            }
        }
        checkReadyVotes();
    }
}

function sendMessage(text, id = -1) {
    if (!text) {
        return;
    }
    const player = players.find(player => player.id === id);
    const data = {
        type: 'ADD_MESSAGE',
        message: {
            messageId: messageId++,
            name: player ? player.name : 'server',
            text
        }
    }
    players.forEach(player => player.send(data));
}

function sendDataToAll(data) {
    players.forEach(player => player.send(data));
}

function sendDataTo(id, data) {
    const player = players.find(player => player.id === id);
    player && player.send(data);
}

function handleEvent(action, data, socket) {
    switch (action) {
        case 'message':
            handleMessage(data, socket);
            break;
        case 'close':
            handleClose(socket);
            break;
        default:
            break;
    }
}

function handleMessage(data, socket) {
    console.log(data);
    switch (data.type) {
        case 'ADD_PLAYER':
            if (gameState === states.WAIT_START) {
                addPlayer(data.name, socket);
            }
            break;
        case 'ADD_MESSAGE':
            sendMessage(data.text, data.id);
            break;
        case 'REMOVE_PLAYER':
            removePlayer(data.player.id);
            break;
        case 'SET_VOTE':
            if (canVote(data.vote.from)) {
                setVote(data.vote.from, data.vote.for);
                checkContinueVotes();
            }
            break;
        case 'SET_READY':
            switchPlayerReady(data.id);
            break;
        default:
            break;
    }
}

function handleClose(socket) {
    const index = players.findIndex(player => player.socket === socket);
    if (index >= 0) {
        const id = players[index].id;
        sendMessage(players[index].name + texts.left_game);
        players.splice(index, 1);
        sendDataToAll({ type: 'REMOVE_PLAYER', player: { id } });
    }
}

module.exports = { handleEvent };