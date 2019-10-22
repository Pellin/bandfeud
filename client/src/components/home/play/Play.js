import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import SubmitBand from './SubmitBand';
import BandList from './BandList';
import MessageBox from '../MessageBox';
import BfGoA from '../../../icons/BfGoA';

import SubmitHighscore from '../../highscores/SubmitHighscore';
import { gameAborted } from '../../../actions/gameStatus';

export const Play = props => {
  const [isFirefox, setIsFirefox] = useState(false);
  const abortGame = () => {
    if (props.inGame) {
      props.onGameAborted();
    }
  };
  useEffect(() => {
    const listener =
      props.os === 'desktop' &&
      (/Firefox/gi.test(navigator.userAgent) ||
        /Chrome/gi.test(navigator.userAgent))
        ? 'visibilitychange'
        : 'blur';
    window.addEventListener(listener, abortGame);
    return () => {
      window.removeEventListener(listener, abortGame);
    };
  });
  useEffect(() => {
    const fireReg = new RegExp('Firefox');
    setIsFirefox(fireReg.test(navigator.userAgent));
  }, []);
  return (
    <>
      {props.showGameOver ? (
        <>
        <div className="game-over-container">
          <div className="game-over-logo">
            <BfGoA />
          </div>
        </div>
         <div className="footer">
           <MessageBox message={props.message} />
        </div>
        </>
      ) : (
        <div className="view-holder">
          {props.isHighscore ? (
            <SubmitHighscore
              bands={props.bands}
              difficulty={props.difficulty}
              history={props.history}
              inGame={props.inGame}
              score={props.score}
              submitted={props.submitted}
              used={props.used}
            />
          ) : (
            <div
              className={
                isFirefox ? 'game-container-firefox' : 'game-container'
              }
            >
              <div className="band-list">
                <BandList bands={props.bands} />
              </div>
              <div className="footer">
                {props.message ? (
                  <MessageBox message={props.message} />
                ) : (
                  <div className="submit-band">
                    {props.inGame && !props.submitted && !props.message && (
                      <SubmitBand
                        bandBank={props.bandBank}
                        difficulty={props.difficulty}
                        inGame={props.inGame}
                        previous={props.previous}
                        score={props.score}
                        submitted={props.submitted}
                        used={props.used}
                        os={props.os}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  onGameAborted: () => dispatch(gameAborted())
});

const mapStateToProps = state => ({
  bandBank: state.bandBank,
  used: state.used,
  submitted: state.submitted,
  previous: state.previous,
  inGame: state.inGame,
  isHighscore: state.isHighscore,
  difficulty: state.difficulty,
  score: state.score,
  showGameOver: state.showGameOver,
  bands: state.bands,
  message: state.message,
  os: state.os
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Play);