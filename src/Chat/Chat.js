import React, { Component } from 'react';
import './Chat.css';
import NewMessage from './NewMessage';
import Message from './Message';

class Chat extends Component {
  render() {
    return (
      <div id="chat">
        <div id="messages">
            {this.props.messages.map(message =>
                <Message
                    key={`message-${message.id}`}
                    message={message}
                    isOwnMessage={message.user === this.props.user}>
                </Message>
            )}
        </div>
        <hr></hr>
        <NewMessage></NewMessage>
      </div>
    );
  }
}

export default Chat;
