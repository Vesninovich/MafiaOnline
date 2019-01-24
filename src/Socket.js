import { connect } from 'react-redux';
// import ActionType from './ActionType';

function SocketComponent(props) {
    props.socket.onmessage = props.onmessage;

    console.log('Socket component set up');

    return (null);
}

function mapDispatchToProps(dispatch) {
    return {
        // onmessage: (message) => dispatch({
        //     ...message,
        //     type: new ActionType(message.type, { shouldBeSent: false })
        // })
        onmessage: (message) => dispatch(JSON.parse(message.data))
    }
}

const Socket = connect(null, mapDispatchToProps)(SocketComponent);
export default Socket;