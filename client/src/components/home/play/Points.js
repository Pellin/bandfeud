import React, { useState, useEffect } from 'react';

const Points = ({ points }) => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false);
    }, 400);
    return () => {
      clearTimeout(timeout);
    };
  });
  return (
    <>
      {points && (
        <div className={show ? 'points' : 'points-hide'}>+{points}</div>
      )}
    </>
  );
};

export default Points;
