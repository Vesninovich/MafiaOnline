import { connect } from 'react-redux';
import { setReady } from '../Actions/game';
import GameFieldComponent from '../Components/Game/GameField';

function mapState(state) {
    const mainPlayer = state.game.player || null;
    return {
        mainPlayer: mainPlayer &&
            state.players.find(player => player.id === mainPlayer.id),
        otherPlayers: mainPlayer &&
            state.players.filter(player => player.id !== mainPlayer.id),
        gameState: state.game.gameState
    }
}

function mapDispatch(dispatch) {
    return {
        setReady: (id) => dispatch(setReady(id))
    }
}

function mergeProps(stateProps, dispatchProps) {
    return {
        ...stateProps,
        ...dispatchProps,
        setReady: () => dispatchProps.setReady(stateProps.mainPlayer.id)
    }
}

const GameField = connect(mapState, mapDispatch, mergeProps)(GameFieldComponent);
export default GameField;