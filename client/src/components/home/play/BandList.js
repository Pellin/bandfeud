import React, { useState, useEffect, useLayoutEffect } from 'react';

import BandItem from './BandItem';

const BandList = ({ bands }) => {
  const [left, setLeft] = useState('0px');
  const setCenter = () => {
    setLeft(window.innerWidth / 2 - bands.length * 210 + 105 + 'px');
  };
  useLayoutEffect(() => {
    if (bands.length < 1) {
      setCenter();
    }        
  });
  useEffect(() => {
    window.addEventListener('resize', setCenter);
    return () => {
      window.removeEventListener('resize', setCenter);
    };
  });
  useLayoutEffect(() => {
    setLeft(l => parseInt(l.slice(0, -2)) - 210 + 'px');
  }, [bands]);
  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        top: '5rem',
        left: left,
        marginBottom: '1rem',
        position: 'absolute',
        transition: 'left, 1s'
      }}
    >
      {bands.map(band => (
        <BandItem
          key={band.name}
          name={band.name}
          url={band.url}
          points={band.points}
        />
      ))}
    </div>
  );
};

export default BandList;
