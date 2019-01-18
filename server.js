const ws = require('ws');

const WS_PORT = process.env.PORT || 4000;

function Player(id, name, socket) {
    this.id = id,
    this.name = name;
    this.socket = socket;
}

players = [];
let playerId = 0;
let messageId = 0;

function addPlayer(name, socket) {
    players.push(new Player(++playerId, name, socket));
    socket.send(JSON.stringify({
        type: 'JOIN_GAME',
        player: {
            id: playerId,
            name: name
        }
    }));
    sendDataToAll({
        type: 'ADD_PLAYER',
        player: {
            id: playerId,
            name: name
        }
    });
    sendMessage(`player ${name} joined`);
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
    sendMessage(`player ${name} left`);
}

function sendMessage(text, name = 'server') {
    sendDataToAll({
        type: 'ADD_MESSAGE',
        message: {
            id: messageId++,
            name: name,
            text
        }
    });
}

function sendDataToAll(data) {
    players.forEach(player => player.socket.readyState === 1
        && player.socket.send(JSON.stringify(data)));
}

const socketServer = new ws.Server({ port: WS_PORT });

socketServer.on('connection', (socket, req) => {
   
    socket.on('message', data => {
        const action = JSON.parse(data);
        console.log(action);
        switch (action.type) {
            case 'ADD_PLAYER':
                addPlayer(action.name, socket);
                break;
            case 'ADD_MESSAGE':
                sendMessage(action.text, action.name);
                break;
            case 'REMOVE_PLAYER':
                removePlayer(action.player.id);
                break;
            default:
                break;
        }
    });

    socket.on('close', () => {
        const index = players.findIndex(player => player.socket === socket);
        if (index >= 0) {
            sendMessage(`player ${players[index].name} left`);
            players.splice(index, 1);
        }
    });
});