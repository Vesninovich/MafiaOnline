import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import './Chat.css';

class NewMessageComponent extends Component {
    render() {
        return (
            <form id="newmessage">
                <textarea id="textarea_NewMessage"></textarea>
                <button id="button_NewMessage" onClick={this.props.sendMessage}>
                    Написать
                </button>
            </form>
        );
    }
}

NewMessageComponent.propTypes = {
    sendMessage: PropTypes.func.isRequired
}

export default NewMessageComponent;
