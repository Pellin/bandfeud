import React, { useState } from 'react';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';

import Counter from './Counter';

import checkBand from '../../../actions/checkBand';
import { setDifficulty } from '../../../actions/setDifficulty';

export const SubmitBand = props => {
  const [band, setBand] = useState('');
  const [iosPlaceHold, setIosPlaceHold] = useState('press to type');

  const onRemovePlaceholder = () => {
    setIosPlaceHold('');
  };
  const onBandChange = e => {
    let bandName = e.target.value;
    if (
      bandName.match(/^[a-zåäö0-9/\-&-,.\s]*$/) &&
      !bandName.match(/^[.,-\s]/)
    ) {
      setBand(bandName);
    }
  };
  const onSubmit = e => {
    e.preventDefault();
    if (band.length < 2 || !band.match(/[\wåäö]$/)) return;

    props.onCheckBand(
      band,
      props.previous,
      props.used,
      props.bandBank,
      props.score,
      props.difficulty
    );
    setBand('');
    props.onSetDifficulty(props.used.length);
  };
  return (
    <>
      {props.os !== 'desktop' && (
        <div className="footer-counter-container">
          <Counter
            submitted={props.submitted}
            inGame={props.inGame}
            used={props.used}
            difficulty={props.difficulty}
            score={props.score}
          />
        </div>
      )}
      <form
        className={
          props.os === 'iOS' ? 'band-input-form-ios' : 'band-input-form'
        }
        onSubmit={onSubmit}
      >
        <input
          className={
            band.length > 25 && props.os !== 'desktop'
              ? 'band-input-long'
              : 'band-input'
          }
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          autoFocus={props.os !== 'desktop' ? false : true}
          maxLength="42"
          onChange={onBandChange}
          onFocus={() => onRemovePlaceholder()}
          placeholder={props.os !== 'desktop' ? iosPlaceHold : undefined}
          spellCheck={false}
          type="text"
          value={band}
        />
      </form>
      {props.previous.previous2 ? (
        <div className="previous">
          {props.previous.previous1.toUpperCase() +
            ' or ' +
            props.previous.previous2.toUpperCase()}
        </div>
      ) : (
        <motion.div
          className="previous"
          animate={{ scale: [null, 1.3, 1] }}
          transition={{ duration: 1 }}
        >
          {props.previous.previous1.toUpperCase()}
        </motion.div>
      )}
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  onCheckBand: (band, previous, used, bandBank, score, difficulty) =>
    dispatch(checkBand(band, previous, used, bandBank, score, difficulty)),
  onSetDifficulty: usedLength => dispatch(setDifficulty(usedLength))
});

export default connect(
  undefined,
  mapDispatchToProps
)(SubmitBand);
