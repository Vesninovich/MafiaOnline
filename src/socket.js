import * as types from './Redux/actionTypes';
import { addMessage } from './Redux/reducers/chat';
import { players } from './Redux/reducers/players';

const setupSocket = (dispatch, name, address = '127.0.0.1', port = 4000) => {
    const socket = new WebSocket(`ws://${address}:${port}`);
    
    socket.onopen = () => {
        socket.send(JSON.stringify({
            type: types.ADD_PLAYER,
            name
        }));
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        switch(data.type) {
            case types.ADD_MESSAGE:
                dispatch(addMessage(data));
                break;
            case types.ADD_PLAYER: case types.REMOVE_PLAYER:
                dispatch(players(data));
                break;
            default:
                break; 
        }
    };

    return socket;
};

export default setupSocket;