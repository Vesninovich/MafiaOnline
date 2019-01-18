import React, { Component } from 'react';
import './GameField.css';
import Civilian from './../Images/Cards/civilian.png';
import Doctor from './../Images/Cards/doctor.png';
import Mistress from './../Images/Cards/mistress.png';
import Commissioner from './../Images/Cards/commissioner.png';
import Mafia from './../Images/Cards/mafia.png';
import Maniac from './../Images/Cards/maniac.png';
import Card from './../Images/Cards/card.png';

class GameField extends Component {
    render() {
        return (
            <div id="field-wrapper">
                <div class="header">
                    <img id="card_of_me" src={Civilian} alt="me"></img>
                    <div id="other_players">
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
                </div>
                <div id="playing_field">
                    <textarea id="text_of_play">Текст</textarea>
                    {/* <div id="voting">
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
                    </div> */}
                    
                </div>
            </div>
        );
    }
}

export default GameField;