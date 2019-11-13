import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';

import Header from '../Header';
import Play from '../home/play/Play';
import ShowBandlistModal from '../highscores/ShowBandlistModal';
import MessageBox from '../home/MessageBox';
import PlayIcon from '../../icons/PlayIcon';
import LogoSquare from '../../icons/LogoSquare';

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
  const [buttonPressed, setButtonPressed] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const startGame = () => {
    setButtonPressed(true);
    setMessage('Get ready...');
    setShowFooter(true);
    setTimeout(() => {
      setMessage('');
      onGameOn();
      onSetMessage('');
    }, 2000);
  };
  const releaseButton = () => {
    setButtonPressed(false);
  };
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const buttonVariants = {
    notPressed: {
      opacity: 1,
      scale: 1,
      rotate: 720
    },
    pressed: {
      opacity: [null, 1, 0],
      scale: [null, 1.1, 0],
      rotate: [null, 780, 0]
    }
  };
  const logoVariants = {
    show: {
      opacity: 1
    },
    hide: {
      opacity: 0
    }
  }
  const footerVariants = {
    show: {
      y: 0
    },
    hide: {
      y: 100
    }
  };
  return (
    <div>
      <Header buttonPressed={buttonPressed} />
      <div>
        {!inGame && (
          <div className="home-container">
            <motion.div
              className="logo-square"
              initial={{ opacity: 0 }}
              animate={buttonPressed ? 'hide' : 'show'}
              transition={{ duration: 2 }}
              variants={logoVariants}
            >
              <LogoSquare />
            </motion.div>

            <div
              title="Start new game"
              className="new-game-button"
              onClick={startGame}
            >
              <motion.div
                className="play-button"
                initial={{ scale: 0, rotate: -360 }}
                animate={buttonPressed ? 'pressed' : 'notPressed'}
                transition={{ duration: 1.2, times: [0, 0.4, 1] }}
                variants={buttonVariants}
                onClick={startGame}
              >
                <PlayIcon />
              </motion.div>
            </div>
            {bands.length > 0 && !message ? (
              <div className="footer">
                <button className="show-modal-button" onClick={openModal}>
                  REVIEW LAST ROUND
                </button>
              </div>
            ) : (
              <div className="footer">
                <button className="show-modal-button-invisible">
                  NOT SHOWING
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {inGame && <Play releaseButton={releaseButton} history={history} />}
      <ShowBandlistModal
        bands={bands}
        closeModal={closeModal}
        showModal={showModal}
      />
      {message && (
        <motion.div
          className="footer"
          ease="ease-out"
          initial={{ y: 100 }}
          animate={showFooter ? 'show' : 'hide'}
          transition={{ duration: 0.3 }}
          variants={footerVariants}
        >
          {message && <MessageBox message={message} />}
        </motion.div>
      )}
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
