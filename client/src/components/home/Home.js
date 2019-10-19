import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Play from '../home/play/Play';
import ShowBandlistModal from '../highscores/ShowBandlistModal';

import getHighscores from '../../actions/getHighscores';
import setMessage from '../../actions/setMessage';
import setOs from '../../actions/setOs';
import { gameOn } from '../../actions/gameStatus';

export const Home = ({
  bands,
  history,
  inGame,
  onSetMessage,
  onGetHighscores,
  onGameOn,
  onSetOs
}) => {
  useEffect(() => {
    onSetOs(navigator.userAgent);
    onGetHighscores();
  });
  const [showModal, setShowModal] = useState(false);
  const startGame = () => {
    onSetMessage('Get ready...');
    onGameOn();
    setTimeout(() => {
      onSetMessage('');
    }, 2000);
  };
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div>
      {!inGame && (
        <div className="buttons-container">
          <button title="Start new game" className="new-game-button" onClick={startGame}>
            <img src="/images/bf_play_a_vit.svg" className="play-logo" alt="Play" />
          </button>
          {bands.length > 0 && (
            <button className="show-modal-button" onClick={openModal}>
              REVIEW LAST ROUND
            </button>
          )}
        </div>
      )}
      {inGame && <Play history={history} />}
      <ShowBandlistModal
        bands={bands}
        closeModal={closeModal}
        showModal={showModal}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  bands: state.bands,
  inGame: state.inGame
});

const mapDispatchToProps = dispatch => ({
  onSetMessage: message => dispatch(setMessage(message)),
  onGetHighscores: () => dispatch(getHighscores()),
  onGameOn: () => dispatch(gameOn()),
  onSetOs: os => dispatch(setOs(os))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
