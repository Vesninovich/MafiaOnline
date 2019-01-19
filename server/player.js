function Player(id, name, socket) {
    this.id = id;
    this.name = name;
    this.votes = [];
    this.role = 'CIVILIAN';
    this.status = 'NOT_READY';

    this.data = () => {
        return {
            id,
            name,
            votes: this.votes,
            role: this.role,
            status: this.status
        }
    };

    this.socket = socket;
    
    this.open = () => this.socket.readyState === 1;

    this.send = (data) => {
        this.open() && this.socket.send(JSON.stringify(data));
    };
}

Player.statuses = {
    NOT_READY: 'NOT_READY',
    READY: 'READY',
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
    DEAD: 'DEAD'
}

Player.roles = {
    MAFIA: 'MAFIA',
    CIVILIAN: 'CIVILIAN'
}

module.exports = Player;