import React, { useState } from 'react';
import { connect } from 'react-redux';

import Counter from './Counter';

import checkBand from '../../../actions/checkBand';
import { setDifficulty } from '../../../actions/setDifficulty';

export const SubmitBand = props => {
  const [band, setBand] = useState('');
  const [iosPlaceHold, setIosPlaceHold] = useState('press to type');

  const onRemovePlaceholder = () => {
    setIosPlaceHold('');
  };
  const onBandChange = event => {
    let bandName = event.target.value;
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
          className={band.length > 25 && props.os !== 'desktop' ? 'band-input-long' : "band-input" }
          type="text"
          inputMode="email"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          autoFocus={props.os !== 'desktop' ? false : true}
          maxLength="42"
          value={band}
          onChange={onBandChange}
          placeholder={props.os !== 'desktop' ? iosPlaceHold : undefined}
          spellCheck={false}
          onFocus={() => onRemovePlaceholder()}
        />
      </form>
      {props.previous.previous2 ? (
        <div className="previous">
          {props.previous.previous1.toUpperCase() +
            ' or ' +
            props.previous.previous2.toUpperCase()}
        </div>
      ) : (
        <div className="previous">{props.previous.previous1.toUpperCase()}</div>
      )}
    </>
  );
};

// export class SubmitBand extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       band: '',
//       iosPlaceHold: 'press to type'
//     };
//   }
//   onSetPlaceholder = () => {
//     this.setState(() => ({ iosPlaceHold: '' }));
//   };
//   onBandChange = event => {
//     let band = event.target.value;
//     if (band.match(/^[a-zåäö0-9/\-&-,.\s]*$/) && !band.match(/^[.,-\s]/)) {
//       this.setState(() => ({ band }));
//     }
//   };
//   onSubmit = e => {
//     e.preventDefault();
//     if (this.state.band.length < 2 || !this.state.band.match(/[\wåäö]$/))
//       return;

//     this.props.onCheckBand(
//       this.state.band,
//       this.props.previous,
//       this.props.used,
//       this.props.bandBank,
//       this.props.score,
//       this.props.difficulty
//     );
//     this.setState(() => ({ band: '' }));
//     this.props.onSetDifficulty(this.props.used.length);
//   };
//   render() {
//     return (
//       <>
//         {this.props.os !== 'desktop' && (
//           <div className="footer-counter-container">
//             <Counter
//               submitted={this.props.submitted}
//               inGame={this.props.inGame}
//               used={this.props.used}
//               difficulty={this.props.difficulty}
//               score={this.props.score}
//             />
//           </div>
//         )}
//         <form
//           className={
//             this.props.os === 'iOS' ? 'band-input-form-ios' : 'band-input-form'
//           }
//           onSubmit={this.onSubmit}
//         >
//           <input
//             className="band-input"
//             type="text"
//             inputMode="email"
//             autoComplete="off"
//             autoCorrect="off"
//             autoCapitalize="none"
//             autoFocus={this.props.os !== 'desktop' ? false : true}
//             maxLength="25"
//             value={this.state.band}
//             onChange={this.onBandChange}
//             placeholder={
//               this.props.os !== 'desktop' ? this.state.iosPlaceHold : undefined
//             }
//             onFocus={() => this.onSetPlaceholder()}
//           />
//         </form>
//         {this.props.previous.previous2 ? (
//           <div className="previous">
//             {this.props.previous.previous1.toUpperCase() +
//               ' or ' +
//               this.props.previous.previous2.toUpperCase()}
//           </div>
//         ) : (
//           <div className="previous">
//             {this.props.previous.previous1.toUpperCase()}
//           </div>
//         )}
//       </>
//     );
//   }
// }

const mapDispatchToProps = dispatch => ({
  onCheckBand: (band, previous, used, bandBank, score, difficulty) =>
    dispatch(checkBand(band, previous, used, bandBank, score, difficulty)),
  onSetDifficulty: usedLength => dispatch(setDifficulty(usedLength))
});

export default connect(
  undefined,
  mapDispatchToProps
)(SubmitBand);
