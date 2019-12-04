const andFix = (userBand, answerBands) => {
  for (let i = 0; i < answerBands.length; i++) {
    if (userBand.replace('and', '&') === answerBands[i].title.toLowerCase()) {
      return userBand.replace('and', '&');
    } else if (
      userBand.replace('&', 'and') === answerBands[i].title.toLowerCase()
    ) {
      return userBand.replace('&', 'and');
    }
  }
  return userBand;
};

module.exports = andFix;
