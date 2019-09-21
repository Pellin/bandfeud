import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../Header';
import Play from '../home/play/Play';

import getHighscores from '../../actions/getHighscores';
import setMessage from '../../actions/setMessage';
import setOs from '../../actions/setOs';
import { gameOn } from '../../actions/gameStatus';

export class Home extends Component {
  startGame = () => {
    this.props.onSetMessage('Get ready...');
    this.props.onGameOn();
    setTimeout(() => {
      this.props.onSetMessage('');
    }, 2000);
  };
  componentDidMount = () => {
    this.props.onSetOs(navigator.userAgent);
    this.props.onGetHighscores();
  };
  render() {
    return (
      <div>
        <Header />
        {!this.props.inGame && (
          <div className="new-game-button-container">
            <button className="new-game-button" onClick={this.startGame}>
              PLAY
            </button>
          </div>
        )}
        {this.props.inGame && <Play history={this.props.history} />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  inGame: state.inGame,
  highscores: state.highscores
});

const mapDispatchToProps = dispatch => ({
  onSetMessage: message => dispatch(setMessage(message)),
  onGetHighscores: () => dispatch(getHighscores()),
  onGameOn: () => dispatch(gameOn()),
  onSetOs: os => dispatch(setOs(os))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
