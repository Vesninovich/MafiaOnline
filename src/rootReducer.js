import { combineReducers } from 'redux';
import { addMessage } from './Reducers/chat';
import { players } from './Reducers/players';
import { game } from './Reducers/game';
// import { socket } from './Reducers/socket';

export default combineReducers({
    messages: addMessage,
    players,
    game,
    // socket
});