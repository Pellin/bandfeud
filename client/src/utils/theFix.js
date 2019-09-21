const theFix = (band, previous) => {
  const regex1 = new RegExp('^the ' + previous.previous1 + '.*');
  const regex2 = new RegExp('^the ' + previous.previous2 + '.*');

  if (band.match(regex1)) {
    return { previous1: 't', previous2: '' };
  } else if (band.match(regex2)) {
    return { previous1: 't', previous2: 't' };
  } else {
    return previous;
  }
};

export default theFix;
