const ws = require('ws');
const handleEvent = require('./server/game').handleEvent;

const WS_PORT = process.env.PORT || 4000;

const socketServer = new ws.Server({ port: WS_PORT });

socketServer.on('connection', (socket) => {
   
    socket.on('message', data =>
        handleEvent('message', JSON.parse(data), socket));

    socket.on('close', () => handleEvent('close', null, socket));
});