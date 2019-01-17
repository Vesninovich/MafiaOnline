import React, { Component } from 'react';
import './Chat.css';

class NewMessage extends Component {
    render() {
        return (
            <div id="newmessage">
                <textarea></textarea>
                <button>Написать</button>
            </div>
        );
    }
}

export default NewMessage;
