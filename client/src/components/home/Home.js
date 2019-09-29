import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../Header';
import Play from '../home/play/Play';
import ShowBandlistModal from '../highscores/ShowBandlistModal';

import getHighscores from '../../actions/getHighscores';
import setMessage from '../../actions/setMessage';
import setOs from '../../actions/setOs';
import { gameOn } from '../../actions/gameStatus';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }
  componentDidMount = () => {
    this.props.onSetOs(navigator.userAgent);
    this.props.onGetHighscores();
  };
  startGame = () => {
    this.props.onSetMessage('Get ready...');
    this.props.onGameOn();
    setTimeout(() => {
      this.props.onSetMessage('');
    }, 2000);
  };
  openModal = () => {
    this.setState(() => ({ showModal: true }));
  };
  closeModal = () => {
    this.setState(() => ({ showModal: false }));
  };
  render() {
    return (
      <div>
        <Header />
        {!this.props.inGame && (
          <div className="buttons-container">
            <button className="new-game-button" onClick={this.startGame}>
              PLAY
            </button>
            {this.props.bands.length > 0 && (
              <button className="show-modal-button" onClick={this.openModal}>
                REVIEW LAST ROUND
              </button>
            )}
          </div>
        )}
        {this.props.inGame && <Play history={this.props.history} />}
        <ShowBandlistModal
          bands={this.props.bands}
          closeModal={this.closeModal}
          showModal={this.state.showModal}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  bands: state.bands,
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
