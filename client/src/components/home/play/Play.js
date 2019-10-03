import React, { Component } from 'react';
import { connect } from 'react-redux';

import SubmitBand from './SubmitBand';
import BandList from './BandList';
import MessageBox from '../MessageBox';
import SubmitHighscore from '../../highscores/SubmitHighscore';

export class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFirefox: false
    };
  }
  componentDidMount = () => {
    const fireReg = new RegExp('Firefox');
    this.setState(() => ({ isFirefox: fireReg.test(navigator.userAgent) }));
  };
  render() {
    return (
      <>
        {this.props.showGameOver ? (
          <div className="game-over-container">
            <div className="game-over-message">
              GAME OVER
            </div>
            <MessageBox message={this.props.message} />
          </div>
        ) : (
          <div className="view-holder">
            {this.props.isHighscore ? (
              <SubmitHighscore
                bands={this.props.bands}
                difficulty={this.props.difficulty}
                history={this.props.history}
                inGame={this.props.inGame}
                score={this.props.score}
                submitted={this.props.submitted}
                used={this.props.used}     
              />
            ) : (
              <div
                className={
                  this.state.isFirefox
                    ? 'game-container-firefox'
                    : 'game-container'
                }
              >
                <div className="band-list">
                  <BandList bands={this.props.bands} />
                </div>
                <div className="footer">
                  {this.props.message ? (
                    <MessageBox message={this.props.message} />
                  ) : (
                    <div className="submit-band">
                      {this.props.inGame &&
                        !this.props.submitted &&
                        !this.props.message && (
                          <SubmitBand
                            bandBank={this.props.bandBank}
                            difficulty={this.props.difficulty}
                            inGame={this.props.inGame}
                            previous={this.props.previous}
                            score={this.props.score}
                            submitted={this.props.submitted}
                            used={this.props.used}
                            os={this.props.os}
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
  }
}

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
