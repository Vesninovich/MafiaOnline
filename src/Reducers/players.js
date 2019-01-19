import { ADD_PLAYER, REMOVE_PLAYER, UPDATE_PLAYER } from '../actionTypes';

export function players(state = [], action) {
    switch (action.type) {
        case ADD_PLAYER:
            const player = state.find(player => player.id === action.player.id);
            return player ? state : [...state, action.player];
        case REMOVE_PLAYER:
            return state.filter(player => player.id !== action.player.id);
        case UPDATE_PLAYER:
            const index = state.findIndex(player => player.id === action.player.id);
            return state.slice(0, index)
                        .concat(action.player)
                        .concat(state.slice(index + 1, state.length));
        default:
            return state;
    }
}