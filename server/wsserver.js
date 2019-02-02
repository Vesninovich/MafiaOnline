const ws = require('ws');

const WS_PORT = process.env.PORT || 4000;

const socketMessageTypes = ['message', 'close']

function setup(eventHandler) {
    const socketServer = new ws.Server({ port: WS_PORT });
    const applyHandler = socket => applyHandlerToSocket(eventHandler, socket);
    socketServer.on('connection', applyHandler);
    return socketServer;
}

function applyHandlerToSocket(eventHandler, socket) {
    socketMessageTypes.forEach(type => {
        socket.on(type, data =>
            eventHandler(type, data ? JSON.parse(data) : data, socket));
    });
}

module.exports = { setup };