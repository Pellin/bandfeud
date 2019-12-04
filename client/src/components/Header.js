import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import Counter from '../components/home/play/Counter';
import Score from '../components/home/play/Score';
import BFLogoSvg from '../icons/BFLogoSvg';
import ISvg from '../icons/ISvg';
import CrownSvg from '../icons/CrownSvg';

export const Header = ({
  onAddFailedBand,
  buttonPressed,
  inGame,
  submitted,
  used,
  difficulty,
  message,
  score,
  os
}) => {
  const visibleVariants = {
    show: {
      opacity: 1
    },
    hide: {
      opacity: 0
    }
  };
  return (
    <div className="header-container">
      <div className="header-side">
        {!inGame && (
          <motion.div
            className="i-link"
            initial={{ opacity: 0 }}
            animate={buttonPressed ? 'hide' : 'show'}
            transition={{ duration: 1.5 }}
            variants={visibleVariants}
          >
            <Link to="/about/">
              <ISvg />
            </Link>
          </motion.div>
        )}
        {inGame && !submitted && !message && os === 'desktop' && (
          <div className="counter-container">
            <Counter
              addFailedBand={onAddFailedBand}
              submitted={submitted}
              inGame={inGame}
              used={used}
              difficulty={difficulty}
              score={score}
            />
          </div>
        )}
      </div>
      <div className="header-center">
        {inGame && (
          <div className="header-logo">
            <BFLogoSvg />
          </div>
        )}
      </div>
      <div className="header-side">
        {!inGame && (
          <motion.div
            className="crown-link"
            initial={{ opacity: 0 }}
            animate={buttonPressed ? 'hide' : 'show'}
            transition={{ duration: 1.5 }}
            variants={visibleVariants}
          >
            <Link to="/highscores/">
              <CrownSvg className="crown-right" />
            </Link>
          </motion.div>
        )}
        {inGame && os === 'desktop' && (
          <div className="desktop-score">
            <Score score={score} />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  inGame: state.inGame,
  submitted: state.submitted,
  used: state.used,
  difficulty: state.difficulty,
  message: state.message,
  score: state.score,
  os: state.os
});

const mapDispatchToProps = dispatch => ({
  onAddFailedBand: band =>
   dispatch({
     type: 'ADD_FAILED_BAND',
     payload: { name: band, mode: 'Out of time' }
   }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
