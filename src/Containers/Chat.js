import { connect } from 'react-redux';
import ChatComponent from '../Components/Chat/Chat';

function mapStateToProps(state, ownProps) {
    return {
        // messages: state.messages.map(message =>
        //     Object.assign({}, message, { name: state.players[message.id] })
        // ),
        messages: state.messages,
        player: state.players[ownProps.playerId]
    };
}

const Chat = connect(mapStateToProps)(ChatComponent);
export default Chat;