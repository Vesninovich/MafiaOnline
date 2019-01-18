import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NewMessage from '../../Containers/NewMessage';
import Message from './Message';
import './Chat.css';

class Chat extends Component {

  sendMessage(event) {
    event.preventDefault();
    console.log('Message sent');
  }

  render() {
    return (
      <div id="chat">
        <div id="messages">
            {this.props.messages.map(message =>
                <Message
                    key={`message-${message.id}`}
                    username={message.name}
                    text={message.text}>
                </Message>
            )}
        </div>
        <hr></hr>
        <NewMessage sendMessage={this.sendMessage}></NewMessage>
      </div>
    );
  }
}

Chat.propTypes = {
  // messages: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     id: PropTypes.number.isRequired,
  //     text: PropTypes.string.isRequired,
  //     player: PropTypes.shape({
  //       id: PropTypes.number.isRequired,
  //       name: PropTypes.string.isRequired
  //     }).isRequired
  //   })
  // ).isRequired
}

export default Chat;
