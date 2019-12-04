import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';

import HighscoreList from '../highscores/HighscoreList';
import BFLogoSvg from '../../icons/BFLogoSvg';
import LogoSquareSvg from '../../icons/LogoSquareSvg';

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
          <BFLogoSvg className="background-logo" />
        ) : (
          <LogoSquareSvg className="background-logo-square" />
        )}

        {highscores.length ? (
          <HighscoreList highscores={highscores} />
        ) : (
          <div className="load-message">Loading highscores...</div>
        )}
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
