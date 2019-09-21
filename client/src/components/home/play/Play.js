import React, { Component } from 'react';
import { connect } from 'react-redux';

import SubmitBand from './SubmitBand';
import BandList from './BandList';
import MessageBox from '../MessageBox';
import SubmitHighscore from '../../highscores/SubmitHighscore';

export class Play extends Component {
  render() {
    return (
      <div className="view-holder">
        {this.props.isHighscore ? (
          <SubmitHighscore
            history={this.props.history}
            submitted={this.props.submitted}
            inGame={this.props.inGame}
            used={this.props.used}
            difficulty={this.props.difficulty}
            score={this.props.score}
          />
        ) : (
          <div className="game-container">
            <div className="band-list">
              <BandList bands={this.props.bands} />
            </div>
            <div className="footer">
              {this.props.message ? (
                <MessageBox message={this.props.message} />
              ) : (
                <div className="submit-band">
                  {!this.props.submitted &&
                    this.props.inGame &&
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
  bands: state.bands,
  message: state.message,
  os: state.os
});

export default connect(mapStateToProps)(Play);
