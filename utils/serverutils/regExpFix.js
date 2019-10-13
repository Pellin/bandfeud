const regExpFix = (userBand, answerBand) => {
  if (userBand === answerBand) return userBand;
  if (userBand.replace(/\W/g, '') === answerBand.replace(/\W/g, '')) {
    return answerBand.toLowerCase();
  }
  return userBand;
};

module.exports = regExpFix;