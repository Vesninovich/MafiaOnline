import { ADD_MESSAGE } from '../actionTypes';

export function addMessage(state = [], action) {
    switch (action.type) {
        case ADD_MESSAGE: case ADD_MESSAGE.name:
            return action.message ? [action.message].concat(state) : state;
        default:
            return state;
    }
}