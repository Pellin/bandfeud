const theFix = (string, correct) => {
  if (string.match(/^the .*/)) {
    if (string[4] == correct[0] && string[5] == correct[1]) {
      string = string.slice(4, string.length);
    }
  }

  if (correct.match(/^the .*/)) {
    if (correct[4] == string[0] && correct[5] == string[1]) {
      string = 'the ' + string;
    }
  }

  return string;
};

module.exports = theFix;
