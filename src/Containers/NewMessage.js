import { connect } from 'react-redux';
import { sendMessage } from '../Actions/chat';
import NewMessageComponent from '../Components/Chat/NewMessage';

function mapStateToProps(state, ownProps) {
    return {
        player: state.game.player
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return { 
        send: (name, text) => dispatch(sendMessage(text, name))
    }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
    return {
        ...stateProps,
        ...dispatchProps,
        onSend: text => dispatchProps.send(stateProps.player.name, text)
    }
}

const NewMessage =
    connect(mapStateToProps, mapDispatchToProps, mergeProps)(NewMessageComponent);
export default NewMessage;