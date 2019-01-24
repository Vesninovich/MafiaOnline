import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Chat.css';

class Message extends Component {
    render() {
        const className = this.props.isOwnMessage
            ? "chat-message own-message"
            : "chat-message";
        return (
            <div className={className}>
                <span className="message-username">
                    {this.props.username ? `${this.props.username}: ` : null}{/*<span> </span>*/}
                </span>
                <span className="message-text">{this.props.text}</span>
            </div>
        );
    }
}

Message.propTypes = {
    isOwnMessage: PropTypes.bool,//.isRequired,
    username: PropTypes.string,//.isRequired,
    text: PropTypes.string,//.isRequired
}

export default Message;
