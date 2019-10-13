const andFix = (userBand, answerBands) => {
  for (let i = 0; i < answerBands.length; i++) {
    if (userBand.replace('and', '&') === answerBands[i].title.toLowerCase()) {
      return answerBands[i].title.toLowerCase();
    }
  }
  return userBand;
};

module.exports = andFix;