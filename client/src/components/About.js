import React from 'react';

const About = () => {
  return (
    <div>
      <div className="info-container">
        <h1>How to play Bandfeud</h1>
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
          For more detailed instructions and references, go to our{' '}
          <a rel="noopener noreferrer" target="_blank" href="https://github.com/Pellin/bandfeud">github page</a>.
        </p>
      </div>
    </div>
  );
};

export default About;
