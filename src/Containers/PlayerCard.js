import { connect } from 'react-redux';
import { sendVote } from '../Actions/game';
import PlayerCardComponent from '../Components/Game/PlayerCard';

function getRole(mainPlayer, player) {
    if (!player || !player.role || !mainPlayer || !mainPlayer.role) {
        return;
    }
    if (player.role === 'MAFIA') {
        if (mainPlayer.role === 'MAFIA' || mainPlayer.status === 'DEAD') {
            return 'MAFIA';
        }
    }
    return 'CIVILIAN';
}

function mapState(state, ownProps) {
    const mainPlayer = state.players.find(player =>
        player.id === state.game.player.id);
    const player = state.players.find(player => player.id === ownProps.id);
    return {
        mainId: mainPlayer ? mainPlayer.id : -1,
        isMain: mainPlayer === player,
        name: player.name,
        status: player.status,
        displayedRole: getRole(mainPlayer, player),
        voted: player && mainPlayer
                      && player.votes.find(vote => vote === mainPlayer.id),
        votes: player ? player.votes.reduce((names, vote) => {
            const player = state.players.find(player => player.id === vote);
            if (player) {
                names.push(player.name);
            };
            return names;
        }, []) : []
    }
}

function mapDispatch(dispatch, ownProps) {
    return {
        voteFor: (mainId) => dispatch(sendVote(mainId, ownProps.id))
    }
}

function mergeProps(stateProps, dispatchProps) {
    return {
        ...stateProps,
        ...dispatchProps,
        voteFor: () => dispatchProps.voteFor(stateProps.mainId)
    }
}

const PlayerCard =
    connect(mapState, mapDispatch, mergeProps)(PlayerCardComponent);
export default PlayerCard;