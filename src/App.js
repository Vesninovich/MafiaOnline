import React, { Component } from 'react';
import Chat from './Chat/Chat';
import { users, messages } from './mocks';
import './App.css';
import GameField from './GameField/GameField';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div id="chat-wrapper">
          <Chat messages={messages} user={users[0]}></Chat>
        </div>
        <GameField id="game-field"></GameField>
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
      </div>
    );
  }
}

export default App;
