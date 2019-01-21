# THIS IS HOW MAFIA WORKS

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Startup

Both cases require running both client and server on separate ports.

### Development:

Client:
```
npm start
```

Websocket server:
```
node server.js
```

### Production:

Client (requires 'serve' nodejs package):
```
npm run build && serve build
```

Websocket server:
```
node server.js
```
