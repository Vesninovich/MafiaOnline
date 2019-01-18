import { ADD_PLAYER, REMOVE_PLAYER } from '../actionTypes';

export function players(state = [], action) {
    switch (action.type) {
        case ADD_PLAYER:
            return [...state, action.player];
        case REMOVE_PLAYER: {
            return state.filter(player => player.id !== action.player.id);
        }
        default:
            return state;
    }
}