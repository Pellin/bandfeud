import shuffle from './shuffle';

const checkBandBank = (bandBank, previous, used) => {
  bandBank = shuffle(bandBank);
  for(let i = bandBank.length - 1; i >= 0; i--) {
    if (bandBank[i].name[0] === previous && !used.includes(bandBank[i].name)) {
      let returnBand = bandBank.splice(i, 1);

      return returnBand[0];
    };
  };
  return false;
}

export default checkBandBank;