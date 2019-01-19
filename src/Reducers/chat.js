import { ADD_MESSAGE } from '../actionTypes';

export function addMessage(state = [], action) {
    switch (action.type) {
        case ADD_MESSAGE:
            return [action.message].concat(state);
        default:
            return state;
    }
}