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
            </div>
        );
    }
}

export default GameFieldComponent;