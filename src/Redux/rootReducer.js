import { combineReducers } from 'redux';
import { addMessage } from './reducers/chat';
import { players } from './reducers/players';

export default combineReducers({ messages: addMessage, players });