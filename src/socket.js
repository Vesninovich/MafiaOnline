import * as types from './Redux/actionTypes';

const setupSocket = (dispatch, name, address = '127.0.0.1', port = 4000) => {
    const socket = new WebSocket(`ws://${address}:${port}`);
    
    socket.onopen = () => {
        const dispatching = {
            type: types.ADD_SOCKET,
            socket
        };
        // console.log(dispatching);
        dispatch(dispatching);
        // dispatch({
        //     type: types.ADD_SOCKET,
        //     action: { socket }
        // });
        socket.send(JSON.stringify({
            type: types.ADD_PLAYER,
            name
        }));
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        switch(data.type) {
            case types.ADD_MESSAGE:
                dispatch(data);
                break;
            case types.ADD_PLAYER: case types.REMOVE_PLAYER:
                dispatch(data);
                break;
            case types.JOIN_GAME:
                dispatch(data);
                break;
            default:
                break;
        }
    };

    return socket;
};

export default setupSocket;