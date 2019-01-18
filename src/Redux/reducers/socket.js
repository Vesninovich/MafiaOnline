import { SETUP_SOCKET } from '../actionTypes';
import setupSocket from '../../socket';

export function socket(state = null, action) {
    switch (action.type) {
        case SETUP_SOCKET:
            return state === null
                ? setupSocket(action.dispatch, action.name, action.address, action.port)
                : state;
        default:
            return state;
    }
}