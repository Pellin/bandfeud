import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Header from '../Header';
import HighscoreList from '../highscores/HighscoreList';

import getHighscores from '../../actions/getHighscores';

const Highscores = ({ highscores, onGetHighscores }) => {
  useEffect(() => {
    if (!highscores.length) {
      onGetHighscores();
    }
  });
  return (
    <div>
      <Header />
      <div className="highscore-container">
        {highscores.length ? (
          <HighscoreList highscores={highscores} />
        ) : (
          <div className="load-message">Loading highscores...</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  highscores: state.highscores
});

const mapDispatchToProps = dispatch => ({
  onGetHighscores: () => dispatch(getHighscores())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Highscores);
