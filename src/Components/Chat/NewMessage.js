import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import './Chat.css';

class NewMessageComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            input: ''
        };
        this.sendMessage = this.sendMessage.bind(this);
    }

    updateMessage(input) {
        this.setState({ input });
    }

    sendMessage() {
        this.props.onSend(this.state.input);
        this.setState({ input: '' });
    }

    render() {
        return (
            <div id="newmessage">
                <textarea
                    id="textarea_NewMessage"
                    onChange={e => this.updateMessage(e.target.value)}
                    value={this.state.input}>
                </textarea>
                <button id="button_NewMessage" onClick={this.sendMessage}>
                    Написать
                </button>
            </div>
        );
    }
}

NewMessageComponent.propTypes = {
    onSend: PropTypes.func.isRequired
}

export default NewMessageComponent;
