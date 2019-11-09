import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import BFLogo from '../icons/BFLogo';
import LogoSquare from '../icons/LogoSquare';

const About = ({ os }) => {
  console.log(os);
  return (
    <div className="info-container">
      {os === 'desktop' ? (
        <BFLogo className="background-logo" />
      ) : (
        <LogoSquare className="background-logo-square" />
      )}
      <div className="info">
        <h1>How to play</h1>

        <h2>Your turn</h2>
        <p>
          Type in a band or an artist beginning with the letter visible under
          the input field.
        </p>
        <p>
          Band or artist names must contain at least two letters or numbers. It
          must begin and end with a letter between a and z or a number.
        </p>
        <p>
          Wait while the app checks if the name exists in the Discogs database.
        </p>
        <p>
          If the name exists, your score increases. The longer the band name,
          the more points you get.
        </p>
        <h2>App turn</h2>
        <p>Next, the app will present a band or an artist. </p>
        <p>
          You now need to submit a band or artist name that begins with the last
          letter of the name the app presented.
        </p>
        <h2>Detailed instructions</h2>
        <p>
          For more detailed instructions and references, please visit the{' '}
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/Pellin/bandfeud"
          >
            Bandfeud Github page
          </a>
          .
        </p>
      </div>
      <Link to="/" className="back-button">
        BACK
      </Link>
    </div>
  );
};

const mapStateToProps = state => ({
  os: state.os
});

export default connect(mapStateToProps)(About);
