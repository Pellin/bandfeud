import React, { useState, useEffect } from 'react';

const Score = props => {
  const [displayedScore, setDisplayedScore] = useState(0);
  useEffect(() => {
    if (displayedScore !== props.score) {
      const ticker = setInterval(() => {
        setDisplayedScore(displayedScore + 1);
        return clearInterval(ticker);
      }, 10);
    }
  }, [props.score, displayedScore]);
  return <>{displayedScore}p</>;
};

export default Score;
