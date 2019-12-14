import React, { useState } from 'react';
import { connect } from 'react-redux';

import CrownSvg from '../../icons/CrownSvg';

import getHighscores from '../../actions/getHighscores';

export const SubmitHighscore = props => {
  const [name, setName] = useState('');
  const [highscoreSet, setHighscoreSet] = useState(false);
  const [nameSubmitted, setNameSubmitted] = useState(false);

  const onTextChange = event => {
    setName(event.target.value);
  };
  const onSubmit = async e => {
    e.preventDefault();
    setNameSubmitted(true);
    try {
      const data = {
        bands: props.bands,
        date: new Date().getTime(),
        player: name,
        score: props.score
      };
      const setHighscore = await fetch(`/api/sethighscore`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (setHighscore.status === 200) {
        setHighscoreSet(true);
        props.onGetHighscores();
      } else {
        alert("Couldn't set highscore");
        return goToPlay();
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  const goToPlay = () => {
    props.onHighscoreSet();
    props.onResetUsed();
    props.onResetScore();
    props.onResetDifficulty();
    props.onGameOver();
  };
  const goToHighscores = () => {
    props.onHighscoreSet();
    props.onResetUsed();
    props.onResetScore();
    props.onResetDifficulty();
    props.onGameOver();
    props.history.push('/highscores');
  };
  return (
    <div className="submit-view">
      {!highscoreSet ? (
        nameSubmitted ? (
          <div className="highscore-message">Setting highscore...</div>
        ) : (
          <>
            <CrownSvg className="submit-highscore-crown" />
            <div className="highscore-message">
              {props.score} points! That's a highscore.
            </div>
            <form className="submit-form" onSubmit={onSubmit}>
              <input
                className="submit-input"
                type="text"
                autoFocus
                autoCorrect="false"
                maxLength="10"
                onChange={onTextChange}
                placeholder="NAME"
                spellCheck={false}
              />
            </form>
          </>
        )
      ) : (
        <>
          <div className="highscore-message">Highscore set!</div>
          <div className="highscore-link-container">
            <div className="link-button" onClick={goToPlay}>
              ✓
            </div>
            <CrownSvg
              className="goto-highscore-crown"
              onClick={goToHighscores}
            />
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  score: state.score,
  isHighscore: state.isHighscore
});

const mapDispatchToProps = dispatch => ({
  onGetHighscores: () => dispatch(getHighscores()),
  onHighscoreSet: () => dispatch({ type: 'HIGHSCORE:_FALSE' }),
  onResetUsed: () => dispatch({ type: 'RESET_USED' }),
  onSubmittedTrue: () => dispatch({ type: 'SUBMITTED:_TRUE' }),
  onResetScore: () => dispatch({ type: 'RESET_SCORE' }),
  onResetDifficulty: () => dispatch({ type: 'RESET_DIFFICULTY' }),
  onResetBands: () => dispatch({ type: 'RESET_BANDS' }),
  onGameOver: () => dispatch({ type: 'GAME_OVER' })
});

export default connect(mapStateToProps, mapDispatchToProps)(SubmitHighscore);
