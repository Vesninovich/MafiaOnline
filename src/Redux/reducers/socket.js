import * as types from '../actionTypes';

export function socket(state = null, action) {
    switch (action.type) {
        case types.ADD_SOCKET:
            return state || action.socket || state;
        case types.SEND_MESSAGE:
            state && state.send(JSON.stringify({
                type: types.ADD_MESSAGE,
                text: action.text,
                name: action.name
            }));
            return state;
        case types.SEND_NEW_PLAYER:
            state && state.send(JSON.stringify({
                type: types.ADD_PLAYER,
                name: action.name
            }));
            return state;
        default:
            return state;
    }
}