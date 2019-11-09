import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import HighscoreList from '../highscores/HighscoreList';
import BFLogo from '../../icons/BFLogo';
import LogoSquare from '../../icons/LogoSquare';

import getHighscores from '../../actions/getHighscores';

export const Highscores = ({ highscores, os, onGetHighscores }) => {
  useEffect(() => {
    if (!highscores.length) {
      onGetHighscores();
    }
  });
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="highscore-container">
        {os === 'desktop' ? (
          <BFLogo className="background-logo" />
        ) : (
          <LogoSquare className="background-logo-square" />
        )}

        {highscores.length ? (
          <HighscoreList highscores={highscores} />
        ) : (
          <div className="load-message">Loading highscores...</div>
        )}
        <Link to="/" className="back-button">
          BACK
        </Link>
      </div>
    </motion.div>
  );
};

const mapStateToProps = state => ({
  highscores: state.highscores,
  os: state.os
});

const mapDispatchToProps = dispatch => ({
  onGetHighscores: () => dispatch(getHighscores())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Highscores);
