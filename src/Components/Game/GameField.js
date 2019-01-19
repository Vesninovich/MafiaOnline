import React, { Component } from 'react';
import PlayerCard from '../../Containers/PlayerCard'

import './Game.css';

let cardId = 0;

class GameFieldComponent extends Component {

    renderMain() {
        const mainPlayer = this.props.mainPlayer;
        return mainPlayer && (
            <PlayerCard id={mainPlayer.id}></PlayerCard>
        );
    }

    render() {
        const mainPlayer = this.props.mainPlayer;
        const otherPlayers = this.props.otherPlayers;
        return (
            <div id="field-wrapper">
                {mainPlayer && <PlayerCard id={mainPlayer.id}></PlayerCard>}
                {
                    otherPlayers && otherPlayers.map(player =>
                        <PlayerCard id={player.id} key={`card-${cardId++}`} />
                    )
                }
                {
                    this.props.gameState === 'WAIT_START'
                    ? <button
                        id="ready-button"
                        onClick={this.props.setReady}>
                        READY
                      </button>
                    : null
                }
                {/* {this.props.otherPlayers.map(
                    player => <PlayerCard id={player.id}></PlayerCard>
                )} */}
                {/* <div class="header">
                    <img id="card_of_me" src={Civilian} alt="me"></img>
                    <div id="other_players">
                        <img id="other_players_1" src={Card} alt="other players"></img>
                        <img id="other_players_2" src={Card} alt="other players"></img>
                        <img id="other_players_3" src={Card} alt="other players"></img>
                        <img id="other_players_4" src={Card} alt="other players"></img>
                        <img id="other_players_5" src={Card} alt="other players"></img>
                    </div>
                </div>
                <div id="playing_field">
                    <textarea id="text_of_play">Текст</textarea>
                    <div id="voting">
                        <img id="other_players_1" src={Card} alt="other players"></img>
                        <img id="other_players_2" src={Card} alt="other players"></img>
                        <img id="other_players_3" src={Card} alt="other players"></img>
                        <img id="other_players_4" src={Card} alt="other players"></img>
                        <img id="other_players_5" src={Card} alt="other players"></img>
                    </div>
                    <div id="action_button">
                        <button id="vote">Голосовать</button>
                        <button id="for_mafia_and_maniac" hidden>Убить</button>
                        <button id="for_commissioner" hidden>Проверить</button>
                        <button id="for_doctor" hidden>Спасти</button>
                        <button id="for_mistress" hidden>Уединиться</button>
                    </div>
                    
                </div> */}
            </div>
        );
    }
}

export default GameFieldComponent;