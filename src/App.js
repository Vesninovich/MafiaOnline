import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chat from './Containers/Chat';
import './App.css';
import GameField from './Containers/GameField';

import { addPlayer } from './Actions/game';

class AppComponent extends Component {

  componentDidMount() {
    this.props.joinGame();
  }

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

function mapDispatchToProps(dispatch, ownProps) {
  return {
    joinGame: () => dispatch(addPlayer(ownProps.name))
  }
}

const App = connect(null, mapDispatchToProps)(AppComponent);
export default App;
