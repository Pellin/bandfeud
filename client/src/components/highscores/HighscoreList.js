import React, { useState } from 'react';

import ShowBandlistModal from '../highscores/ShowBandlistModal';
import Crown from '../../icons/Crown';

const HighscoreList = ({ highscores }) => {
  const [showModal, setShowModal] = useState(false);
  const [bands, setBands] = useState([]);
  const [playerInfo, setPlayerInfo] = useState({
    index: 0,
    player: '',
    date: null,
    score: 0
  });
  const closeModal = () => {
    setShowModal(false);
    setBands([]);
  };
  const onHighscoreCLick = highscore => {
    setPlayerInfo({
      player: highscore.player,
      date: highscore.date,
      score: highscore.score
    });
    setBands(highscore.bands);
    setShowModal(true);
  };
  return (
    <>
      <div className="title-container">
        <Crown width={25} height="100%" className="crown-left" />
        <div className="highscore-title">HIGHSCORES</div>
        <Crown width={25} height="100%" className="crown-right" />
      </div>
      <table>
        <tbody className="highscore-body">
          {highscores.map(highscore => (
            <tr
              className="hs-row"
              onClick={() => onHighscoreCLick(highscore)}
              key={highscore._id}
            >
              <td className="hs-player">{highscore.player}</td>
              <td className="hs-score">{highscore.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ShowBandlistModal
        bands={bands}
        playerInfo={playerInfo}
        closeModal={closeModal}
        showModal={showModal}
      />
    </>
  );
};

export default HighscoreList;
