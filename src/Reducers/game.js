import { JOIN_GAME, SET_STATE, SET_VOTE, SET_READY } from '../actionTypes';

export function game(state = {}, action) {
    switch (action.type) {
        case JOIN_GAME: case JOIN_GAME.name:
            return {...state, player: action.player };
        case SET_STATE: case SET_STATE.name:
            return { ...state, gameState: action.gameState };
        case SET_VOTE: case SET_VOTE.name:
            // return { ...state, gameState: action.gameState };
            return state;
        case SET_READY: case SET_READY.name:
            // return { ...state, gameState: action.gameState };
            return state;
        default:
            return state;
    }
}