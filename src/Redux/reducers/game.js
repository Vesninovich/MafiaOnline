import { JOIN_GAME } from '../actionTypes';

export function game(state = {}, action) {
    switch (action.type) {
        case JOIN_GAME:
            return {...state, player: action.player };
        default:
            return state;
    }
}