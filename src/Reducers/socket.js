import * as types from '../actionTypes';

export function socket(state = null, action) {
    switch (action.type) {
        case types.ADD_SOCKET:
            return state || action.socket || state;
        case types.SEND_MESSAGE:
            state && state.send(JSON.stringify(action));
            return state;
        case types.SEND_NEW_PLAYER:
            state && state.send(JSON.stringify(action));
            return state;
        case types.SEND_VOTE:
            state && state.send(JSON.stringify(action));
            return state;
        case types.SET_READY:
            state && state.send(JSON.stringify(action));
            return state;
        default:
            return state;
    }
}