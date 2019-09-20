const dotFix = string => {
  let stringSplit = string.split(' ');

  for (let i = 0; i < stringSplit.length - 1; i++) {
    if (
      stringSplit[i].length === 1 &&
      stringSplit[i] != 'a' &&
      !stringSplit[i].match(/[0-9]/)
    ) {
      stringSplit[i] = stringSplit[i] + '.';
    }
  }

  string = stringSplit.join(' ');
  return string;
};

module.exports = dotFix;
