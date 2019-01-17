import React, { Component } from 'react';
import Chat from './Chat/Chat';
import { users, messages } from './mocks';
import './App.css';
import GameField from './GameField/GameField';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div id="Name_of_Game">
          <h1>MafiaOnline</h1>
        </div>
        <canvas id="Game"> </canvas>
        <div id="chat-wrapper">
          <Chat messages={messages} user={users[0]}></Chat>
        </div>
        <button id="chat_open_close">&uarr;&darr;</button>
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
        <footer id="footer">&copy;&nbsp;Веснин&nbsp;Д.В.,&nbsp;Кузьминых&nbsp;И.С.,&nbsp;Кузьминых&nbsp;М.Н.,&nbsp;2019</footer>
      </div>
    );
  }
}

export default App;
