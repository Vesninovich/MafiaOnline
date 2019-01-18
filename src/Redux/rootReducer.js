import { combineReducers } from 'redux';
import { addMessage } from './reducers/chat';
import { players } from './reducers/players';
import { game } from './reducers/game';
import { socket } from './reducers/socket';

export default combineReducers({ messages: addMessage, players, game, socket });