import React from 'react';

const BandItem = ({ name, url }) => {
  const fireReg = new RegExp('Firefox');
  const isFirefox = fireReg.test(navigator.userAgent);
  return (
    <div className="band-item">
      <div className="image-container">
        <div className="band-item-image">
          <img className="img" src={url} alt={'"' + { name } + '"'} />
        </div>
      </div>
      <div className={isFirefox ? "title-flow-firefox" : "title-flow"}>
        <div className="band-item-title-container">
          <div className="band-item-title">{name}</div>
        </div>
      </div>
    </div>
  );
};

export default BandItem;
