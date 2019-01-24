import ActionType from './ActionType';

export const ADD_MESSAGE = new ActionType('ADD_MESSAGE', { shouldBeSent: true });

export const ADD_PLAYER = new ActionType('ADD_PLAYER', { shouldBeSent: true });
export const REMOVE_PLAYER = new ActionType('REMOVE_PLAYER');
export const UPDATE_PLAYER = new ActionType('UPDATE_PLAYER');

export const SET_VOTE = new ActionType('SET_VOTE', { shouldBeSent: true });
export const SET_READY = new ActionType('SET_READY', { shouldBeSent: true });
// export const SEND_NEW_PLAYER = new ActionType('SEND_NEW_PLAYER');

export const JOIN_GAME = new ActionType('JOIN_GAME', { shouldBeSent: true });
export const SET_STATE = new ActionType('SET_STATE');