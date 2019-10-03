import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import SubmitBand from './SubmitBand';
import BandList from './BandList';
import MessageBox from '../MessageBox';
import SubmitHighscore from '../../highscores/SubmitHighscore';

export const Play = (props) => {
  const [isFirefox, setIsFirefox] = useState(false);
  useEffect(() => {
    const fireReg = new RegExp('Firefox');
    setIsFirefox(fireReg.test(navigator.userAgent));
  }, []);
  return (
    <>
      {props.showGameOver ? (
        <div className="game-over-container">
          <div className="game-over-message">GAME OVER</div>
          <MessageBox message={props.message} />
        </div>
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
                isFirefox
                  ? 'game-container-firefox'
                  : 'game-container'
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
                    {props.inGame &&
                      !props.submitted &&
                      !props.message && (
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

export default connect(mapStateToProps)(Play);
