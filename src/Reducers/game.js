import { JOIN_GAME, SET_STATE } from '../actionTypes';

export function game(state = {}, action) {
    switch (action.type) {
        case JOIN_GAME:
            return {...state, player: action.player };
        case SET_STATE:
            return {...state, gameState: action.gameState};
        default:
            return state;
    }
}