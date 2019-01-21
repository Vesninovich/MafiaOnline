import React, { Component } from 'react';
import Chat from './Containers/Chat';
import './App.css';
import GameField from './Containers/GameField';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div id="Name_of_Game">
          <h1>MafiaOnline</h1>
        </div>
        <div id="chat-wrapper">
          <Chat playerId={0}></Chat>
        </div>
        <div id="game-field">
          <GameField></GameField>
        </div>
      </div>
    );
  }
}

export default App;
