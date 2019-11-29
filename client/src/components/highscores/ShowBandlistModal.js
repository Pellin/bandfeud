import React from 'react';
import Modal from 'react-modal';

import moment from 'moment';

import BfGoA from '../../icons/BfGoA';

Modal.setAppElement(document.getElementById('root'));

const ShowBandlistModal = props => {
  const points = [];
  if (props.showModal && props.lastRound) {
    for (let band of props.bands) {
      if (band.points) {
        points.push(band.points);
      }
    }
  }
  const goToDiscogs = band => {
    if (band.mode) return;
    if (band.id) {
      window.open(`https://www.discogs.com/artist/${band.id}`);
    } else {
      if (band.name === 'n.w.a') {
        band.name = 'n.w.a.';
      }
      const arr = band.name.split(' ');
      const string = arr.join('+');
      window.open(`https://www.discogs.com/artist/${string}`);
    }
  };
  return (
    <Modal
      isOpen={!!props.showModal}
      onRequestClose={props.closeModal}
      contentLabel="BandList"
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-header">
        {props.playerInfo && (
          <>
            <div className="modal-header-left">
              {moment(props.playerInfo.date).format('DD/MM/YYYY')}{' '}
            </div>
            <div className="header-player">
              <div className="header-stopwatch">
                <BfGoA />
              </div>
              {props.playerInfo.player}
              <p>
                {props.bands.length / 2 - 0.5}{' '}
                {props.bands.length / 2 - 0.5 === 1 ? 'band' : 'bands'}
              </p>
            </div>
            <div className="modal-header-right">{props.playerInfo.score}p</div>
          </>
        )}
      </div>
      {props.lastRound && (
        <div className="modal-header">
          <div className="last-round-info">
            {points.length && points.reduce((acc, curr) => acc + curr)}p
            <p>
              {props.bands.length / 2 - 0.5}{' '}
              {props.bands.length / 2 - 0.5 === 1 ? 'band' : 'bands'}
            </p>
          </div>
        </div>
      )}
      <div className="modal-flow">
        {props.showModal &&
          props.bands.map(band => (
            <div className="band-info" key={band.mode ? band.mode : band.name}>
              <div className="band-image-container">
                {band.url ? (
                  <img
                    title={`Open Discogs page for ${band.name.toUpperCase()} `}
                    onClick={() => goToDiscogs(band)}
                    className="band-image"
                    src={band.url}
                    alt={band.name}
                  />
                ) : (
                  <div className="fail-svg">
                    <BfGoA />
                  </div>
                )}
              </div>
              <div className="band-name-container">
                {band.points ? (
                  <div className="band-points">{band.points}p</div>
                ) : band.mode ? (
                  <div className="band-points">{band.mode}</div>
                ) : (
                  <div className="no-band-points">No points</div>
                )}
                <div
                  className={
                    band.points
                      ? 'band-name'
                      : band.url
                      ? 'band-name-computer'
                      : 'band-name-failed'
                  }
                >
                  {band.name}
                </div>
              </div>
            </div>
          ))}
      </div>
    </Modal>
  );
};

export default ShowBandlistModal;
