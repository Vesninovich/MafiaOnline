import React, { Component } from 'react';
import Chat from './Chat/Chat';
import { users, messages } from './mocks';
import './App.css';
import GameField from './GameField/GameField';
import Announcement from './Images/announcement.png';
import Civilian from './Images/Cards/civilian.png';
import Doctor from './Images/Cards/doctor.png';
import Mistress from './Images/Cards/mistress.png';
import Commissioner from './Images/Cards/commissioner.png';
import Mafia from './Images/Cards/mafia.png';
import Maniac from './Images/Cards/maniac.png';
import Card from './Images/Cards/card.png';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div id="Name_of_Game">
          <h1>MafiaOnline</h1>
        </div>
        <div id="before_authorization" hidden>
          <img src={Announcement} alt="announcement"></img><br></br>
          <form id="authorization">
            <label>
              <span>Login</span>
              <input type="text" placeholder="Login" required autofocus></input><br></br>
            </label>
            <label>
              <span>IP:port</span>
              <input type="text" placeholder="IP:port" required></input><br></br>
            </label>
            <button id="login">Войти</button>
          </form>
        </div>
        <div id="after_authorization">
          <div id="chat-wrapper">
              <Chat messages={messages} user={users[0]}></Chat>
            </div>
            <div id="role_assignment">
              <img id="me" src={Mafia} alt="me"></img><br></br>
              <img id="players_1" src={Card} alt="other players"></img>
              <img id="players_2" src={Card} alt="other players"></img>
              <img id="players_3" src={Card} alt="other players"></img>
              <img id="players_4" src={Card} alt="other players"></img>
              <img id="players_5" src={Card} alt="other players"></img>
            </div>
            <div id="game-field" hidden>
              <GameField></GameField>
            </div>
        </div>
          
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
