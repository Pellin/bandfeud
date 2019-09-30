import React from 'react';
import Modal from 'react-modal';

import moment from 'moment';

Modal.setAppElement(document.getElementById('root'));

const ShowBandlistModal = props => {
  const goToDiscogs = band => {
    if (band.name === 'n.w.a') {
      band.name = 'n.w.a.';
    }
    const arr = band.name.split(' ');
    const string = arr.join('+');
    window.open(`https://www.discogs.com/artist/${string}`);
  };
  return (
    <Modal
      isOpen={!!props.showModal}
      onRequestClose={props.closeModal}
      contentLabel="BandList"
      closeTimeoutMS={200}
      className="modal"
    >
      {props.playerInfo && (
        <div className="modal-header">
          <div className="header-date">
            {moment(props.playerInfo.date).format('DD/MM/YYYY')}{' '}
          </div>{' '}
          <div className="header-player">
            {props.playerInfo.index + 1}. {props.playerInfo.player}
          </div>{' '}
          <div className="header-points">{props.playerInfo.score} points</div>
        </div>
      )}
      {props.showModal &&
        props.bands.map(band => (
          <div className="band-info" key={band.name}>
            <div className="band-image-container">
              <img
                title={`Open Discogs page for ${band.name.toUpperCase()} `}
                onClick={() => goToDiscogs(band)}
                className="band-image"
                src={band.url}
                alt={band.name}
              />
            </div>
            <div className="band-name-container">
              <div className={band.points ? 'band-name' : 'band-name-computer'}>
                {band.name}
              </div>
            </div>

            {band.points ? (
              <div className="band-points">{band.points} points</div>
            ) : (
              <div className="no-band-points">No points</div>
            )}
          </div>
        ))}
    </Modal>
  );
};

export default ShowBandlistModal;
