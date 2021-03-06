import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ShowBandlistModal from '../highscores/ShowBandlistModal';
import CrownSvg from '../../icons/CrownSvg';

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
        <CrownSvg className="crown-left" />
        <div className="highscore-title">HIGHSCORES</div>
        <CrownSvg className="crown-right" />
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
      <Link to="/" className="back-button">
        BACK
      </Link>
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
