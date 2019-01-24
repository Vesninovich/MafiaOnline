// import * as types from './actionTypes';

// export function GameSocket(address = '127.0.0.1', port = 4000) {
//     this.socket = new WebSocket(`ws://${address}:${port}`);
// }

export function setupSocket(address, port) {
    const socket = new WebSocket(`ws://${address}:${port}`);
    return new Promise(resolve => socket.onopen = () => resolve(socket));
}

export function createSocketMiddleware(socket) {
    return store => next => action => {
        if (action.type.options && action.type.options.shouldBeSent) {
            socket.send(JSON.stringify({ ...action, type: action.type.name }));
        }
        next(action);
    }
}

// const setupSocket = (dispatch, name, address = '127.0.0.1', port = 4000) => {
//     const socket = new WebSocket(`ws://${address}:${port}`);
    
//     socket.onopen = () => {
//         dispatch({
//             type: types.ADD_SOCKET,
//             socket
//         });
//         socket.send(JSON.stringify({
//             type: types.ADD_PLAYER,
//             name
//         }));
//     };

//     socket.onmessage = (event) => {
//         const data = JSON.parse(event.data);
//         console.log(data);
//         switch(data.type) {
//             case types.ADD_MESSAGE:
//             case types.ADD_PLAYER:
//             case types.REMOVE_PLAYER:
//             case types.UPDATE_PLAYER:
//             case types.JOIN_GAME:
//             case types.SET_STATE:
//                 dispatch(data);
//                 break;
//             default:
//                 break;
//         }
//     };

//     return socket;
// };

// export default setupSocket;