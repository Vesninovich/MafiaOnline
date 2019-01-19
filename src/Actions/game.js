import * as types from '../actionTypes';

export function sendVote(idFrom, idFor) {
    return {
        type: types.SEND_VOTE,
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