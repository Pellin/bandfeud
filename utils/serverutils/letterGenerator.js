const shuffle = require('./shuffle');

const letterGenerator = () => {
  let capitals = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'Y',
    'Z'
  ];
  capitals = shuffle(capitals);
  let capital = capitals[Math.floor(Math.random() * capitals.length)];
  let nmbr;

  if (capital == 'A') {
    alphabet = [
      'b',
      'c',
      'd',
      'f',
      'g',
      'h',
      'l',
      'm',
      'n',
      'p',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y'
    ];
    nmbr = Math.floor(Math.random() * alphabet.length);
    return capital + alphabet[nmbr];
  } else if (capital == 'B') {
    alphabet = ['e', 'i', 'l', 'o', 'r', 'u', 'y'];
    nmbr = Math.floor(Math.random() * alphabet.length);
    return capital + alphabet[nmbr];
  } else if (capital == 'C') {
    alphabet = ['a', 'e', 'h', 'i', 'l', 'o', 'r', 'u', 'y'];
    nmbr = Math.floor(Math.random() * alphabet.length);
    return capital + alphabet[nmbr];
  } else if (capital == 'D') {
    alphabet = ['a', 'e', 'o', 'r', 'w', 'y'];
    nmbr = Math.floor(Math.random() * alphabet.length);
    return capital + alphabet[nmbr];
  } else if (capital == 'E') {
    alphabet = [
      'c',
      'd',
      'f',
      'g',
      'h',
      'j',
      'l',
      'm',
      'n',
      'p',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'y'
    ];
    nmbr = Math.floor(Math.random() * alphabet.length);
    return capital + alphabet[nmbr];
  } else if (capital == 'F') {
    alphabet = ['a', 'i', 'l', 'o', 'r', 'u'];
    nmbr = Math.floor(Math.random() * alphabet.length);
    return capital + alphabet[nmbr];
  } else if (capital == 'G') {
    alphabet = ['a', 'e', 'i', 'l', 'o', 'r', 'u', 'y'];
    nmbr = Math.floor(Math.random() * alphabet.length);
    return capital + alphabet[nmbr];
  } else if (capital == 'H') {
    alphabet = ['a', 'e', 'i', 'o', 'u', 'y'];
    nmbr = Math.floor(Math.random() * alphabet.length);
    return capital + alphabet[nmbr];
  } else if (capital == 'I') {
    alphabet = ['n', 's', 't'];
    nmbr = Math.floor(Math.random() * alphabet.length);
    return capital + alphabet[nmbr];
  } else if (capital == 'K') {
    alphabet = ['a', 'e', 'i', 'n', 'o', 'r', 'y'];
    nmbr = Math.floor(Math.random() * alphabet.length);
    return capital + alphabet[nmbr];
  } else if (capital == 'L') {
    alphabet = ['a', 'e', 'i', 'o', 'y'];
    nmbr = Math.floor(Math.random() * alphabet.length);
    return capital + alphabet[nmbr];
  } else if (capital == 'M') {
    alphabet = ['a', 'e', 'i', 'o', 'u', 'y'];
    nmbr = Math.floor(Math.random() * alphabet.length);
    return capital + alphabet[nmbr];
  } else if (capital == 'N') {
    alphabet = ['a', 'o', 'u', 'y'];
    nmbr = Math.floor(Math.random() * alphabet.length);
    return capital + alphabet[nmbr];
  } else if (capital == 'O') {
    alphabet = [
      'b',
      'c',
      'd',
      'f',
      'g',
      'h',
      'j',
      'l',
      'm',
      'n',
      'p',
      'r',
      's',
      't',
      'v',
      'w'
    ];
    nmbr = Math.floor(Math.random() * alphabet.length);
    return capital + alphabet[nmbr];
  } else if (capital == 'P') {
    alphabet = ['a', 'e', 'i', 'j', 'l', 'o', 'r', 's', 'u', 'y'];
    nmbr = Math.floor(Math.random() * alphabet.length);
    return capital + alphabet[nmbr];
  } else if (capital == 'R') {
    alphabet = ['a', 'e', 'h', 'i', 'o', 'u', 'y'];
    nmbr = Math.floor(Math.random() * alphabet.length);
    return capital + alphabet[nmbr];
  } else if (capital == 'S') {
    alphabet = [
      'a',
      'c',
      'e',
      'h',
      'i',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      't',
      'u',
      'v',
      'y'
    ];
    nmbr = Math.floor(Math.random() * alphabet.length);
    return capital + alphabet[nmbr];
  } else if (capital == 'T') {
    alphabet = ['a', 'e', 'h', 'i', 'o', 'r', 't', 'u', 'y'];
    nmbr = Math.floor(Math.random() * alphabet.length);
    return capital + alphabet[nmbr];
  } else if (capital == 'U') {
    alphabet = ['n', 'r', 't'];
    nmbr = Math.floor(Math.random() * alphabet.length);
    return capital + alphabet[nmbr];
  } else if (capital == 'V') {
    alphabet = ['a', 'e', 'i', 'o'];
    nmbr = Math.floor(Math.random() * alphabet.length);
    return capital + alphabet[nmbr];
  } else if (capital == 'W') {
    alphabet = ['a', 'e', 'i', 'o', 'r'];
    nmbr = Math.floor(Math.random() * alphabet.length);
    return capital + alphabet[nmbr];
  } else if (capital == 'Y') {
    alphabet = ['e'];
    nmbr = Math.floor(Math.random() * alphabet.length);
    return capital + alphabet[nmbr];
  } else if (capital == 'Z') {
    alphabet = ['a', 'e', 'o'];
    nmbr = Math.floor(Math.random() * alphabet.length);
    return capital + alphabet[nmbr];
  } else return capital;
};

module.exports = letterGenerator;
