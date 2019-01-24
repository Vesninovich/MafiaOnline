import * as types from '../actionTypes';

export function addPlayer(name) {
    return {
        type: types.ADD_PLAYER,
        name
    }
}

export function sendVote(idFrom, idFor) {
    return {
        // type: types.SEND_VOTE,
        type: types.SET_VOTE,
        vote: {
            from: idFrom,
            for: idFor
        }
    }
}

export function setReady(id) {
    return {
        type: types.SET_READY,
        id
    }
}