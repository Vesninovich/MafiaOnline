import React, { Component } from 'react';

import './Game.css';

import Civilian from './../../Images/Cards/civilian.png';
import Mafia from './../../Images/Cards/mafia.png';
import Card from './../../Images/Cards/card.png';

class PlayerCardComponent extends Component {

    getCard() {
        switch(this.props.displayedRole) {
            case 'CIVILIAN':
                return Civilian;
            case 'MAFIA':
                return Mafia;
            default:
                return Card;
        }
    }

    renderVotes() {
        return this.props.status === 'INACTIVE' ? null : (
            this.props.votes.map(name =>
                <span key={`vote-${name}`}>
                    {name}
                </span>)
        )
    }

    render() {
        const classes =
            'player-card' +
            (this.props.voted ? ' voted' : '') +
            (this.props.status === 'READY' ? ' ready' : '') +
            (this.props.status === 'DEAD' ? ' dead' : '');
        return (
            <div className={classes} onClick={this.props.voteFor}>
                <span>{this.props.isMain ? 'Я' : this.props.name}</span>
                <img src={this.getCard()} alt={this.props.displayedRole}></img>
                {this.renderVotes()}
            </div>
        );
    }
}

export default PlayerCardComponent;