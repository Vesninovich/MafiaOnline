import React, { Component } from 'react';
import './Chat.css';

class Message extends Component {
    render() {
        const className = this.props.isOwnMessage
            ? "chat-message own-message"
            : "chat-message";
        return (
            <div className={className}>
                <span className="message-username">
                    {this.props.message.user.name}:<span> </span>
                </span>
                <span className="message-text">{this.props.message.text}</span>
            </div>
        );
    }
}

export default Message;
