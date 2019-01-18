import { connect } from 'react-redux';
import ChatComponent from '../Chat/Chat';

function mapStateToProps(state, ownProps) {
    return {
        messages: state.messages,
        player: state.players[ownProps.playerId]
    };
}

const Chat = connect(mapStateToProps)(ChatComponent);
export default Chat;