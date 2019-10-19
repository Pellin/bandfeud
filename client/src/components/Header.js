import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Counter from '../components/home/play/Counter';

export const Header = ({
  inGame,
  submitted,
  used,
  difficulty,
  message,
  score,
  os
}) => {
  return (
    <div className="header-container">
      <div className="flex-counter">
        {inGame && !submitted && !message && os === 'desktop' && (
          <div className="counter-container">
            <Counter
              submitted={submitted}
              inGame={inGame}
              used={used}
              difficulty={difficulty}
              score={score}
            />
          </div>
        )}
      </div>
      <div className="header-center">
        <div className="link-container">
          {!inGame && (
            <div className="link">
              <NavLink to="/" exact activeClassName="active-link">
                Play
              </NavLink>
            </div>
          )}
        </div>
        {inGame ? (
          <div className="header-logo-link" title="About Bandfeud">
            <img src="/images/bf_c.svg" alt="BandFeud" />
          </div>
        ) : (
          <NavLink to="/about/">
            <div className="header-logo" title="About Bandfeud">
              <img src="/images/bf_c.svg" alt="BandFeud" />
            </div>
          </NavLink>
        )}
        <div className="link-container">
          {!inGame && (
            <div className="link">
              <NavLink to="/highscores/" activeClassName="active-link">
                Highscores
              </NavLink>
            </div>
          )}
        </div>
      </div>
      <div className="flex-score">
        {inGame && used.length > 0 && (
          <div className="score">Score: {score}</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  inGame: state.inGame,
  submitted: state.submitted,
  used: state.used,
  difficulty: state.difficulty,
  message: state.message,
  score: state.score,
  os: state.os
});

export default connect(mapStateToProps)(Header);

// {inGame ? (
//   ) : (
//     <NavLink to="/about/">
//       <div className="header-logo-link" title="About Bandfeud">
//         <img src="/images/bf_c.svg" alt="BandFeud" />
//       </div>
//     </NavLink>
//   )}
