import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../Header';
import HighscoreList from '../highscores/HighscoreList';

import getHighscores from '../../actions/getHighscores';

class Highscores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      highscore: false
    };
  }
  componentDidMount = () => {
    if (!this.props.highscores.length) {
      this.props.onGetHighscores();
    }
  };
  render() {
    return (
      <div>
        <Header />
        <div className="highscore-container">
        
          {this.props.highscores.length ? (
            <HighscoreList highscores={this.props.highscores} />
          ) : (
            <div className="load-message">Loading highscores...</div>
          )}
        </div>
      </div>
    );
  }
}

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
