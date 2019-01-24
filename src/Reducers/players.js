import { ADD_PLAYER, REMOVE_PLAYER, UPDATE_PLAYER } from '../actionTypes';

export function players(state = [], action) {
    switch (action.type) {
        case ADD_PLAYER: case ADD_PLAYER.name:
            const player = state.find(player => player.id === action.player.id);
            return !player && action.player ? [...state, action.player] : state;
        case REMOVE_PLAYER: case REMOVE_PLAYER.name:
            return state.filter(player => player.id !== action.player.id);
        case UPDATE_PLAYER: case UPDATE_PLAYER.name:
            const index = state.findIndex(player => player.id === action.player.id);
            return state.slice(0, index)
                        .concat(action.player)
                        .concat(state.slice(index + 1, state.length));
        default:
            return state;
    }
}