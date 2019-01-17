import React, { Component } from 'react';
import './Chat.css';

class NewMessage extends Component {
    render() {
        return (
            <div id="newmessage">
                <textarea id="textarea_NewMessage"></textarea>
                <button id="button_NewMessage">Написать</button>
            </div>
        );
    }
}

export default NewMessage;
