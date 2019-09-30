import React, { Component } from 'react';
import { connect } from 'react-redux';

import getHighscores from '../../actions/getHighscores';

class SubmitHighscore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      highscoreSet: false,
      nameSubmitted: false
    };
  }
  onTextChange = event => {
    let name = event.target.value;
    this.setState(() => ({ name }));
  };
  onSubmit = async e => {
    e.preventDefault();
    this.setState(() => ({ nameSubmitted: true }));

    try {
      const data = {
        bands: this.props.bands,
        date: new Date().getTime(),
        player: this.state.name,
        score: this.props.score
      };
      const setHighscore = await fetch(`/api/sethighscore`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (setHighscore.status === 200) {
        this.setState(() => ({ highscoreSet: true }));
        this.props.onGetHighscores();
      } else {
        console.log("Couldn't set highscore");
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  goToPlay = () => {
    this.props.onHighscoreSet();
    this.props.onResetUsed();
    this.props.onResetScore();
    this.props.onResetBandBank();
    this.props.onResetDifficulty();
    this.props.onGameOver();
  };
  goToHighscores = () => {
    this.props.onHighscoreSet();
    this.props.onResetUsed();
    this.props.onResetScore();
    this.props.onResetBandBank();
    this.props.onResetDifficulty();
    this.props.onGameOver();
    this.props.history.push('/highscores');
  };
  render() {
    return (
      <div className="submit-view">
        {!this.state.highscoreSet ? (
          this.state.nameSubmitted ? (
            <div className="highscore-message">Setting highscore...</div>
          ) : (
            <>
              <div className="highscore-message">
                {this.props.score} points! That's a highscore.
              </div>
              <form className="submit-form" onSubmit={this.onSubmit}>
                <label className="submit-label">Enter your name:</label>
                <input
                  className="submit-input"
                  type="text"
                  autoFocus
                  maxLength="10"
                  onChange={this.onTextChange}
                />
              </form>
            </>
          )
        ) : (
          <>
            <div className="highscore-message">Highscore set!</div>
            <div className="highscore-link-container">
              <div className="link-button" onClick={this.goToPlay}>
                Ok
              </div>
              <div className="link-button" onClick={this.goToHighscores}>
                Go to highscores
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

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
  onResetBandBank: () => dispatch({ type: 'RESET_BANDBANK' }),
  onResetDifficulty: () => dispatch({ type: 'RESET_DIFFICULTY' }),
  onResetBands: () => dispatch({ type: 'RESET_BANDS' }),
  onGameOver: () => dispatch({ type: 'GAME_OVER' })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmitHighscore);
