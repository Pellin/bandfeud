const switchPrevious = previous => {
  if (previous.charCodeAt([0]) > 48 && previous.charCodeAt([0]) < 58) {
    switch (previous) {
      case '1':
        previous = 'e';
        break;
      case '2':
        previous = 'o';
        break;
      case '3':
        previous = 'e';
        break;
      case '4':
        previous = 'r';
        break;
      case '5':
        previous = 'e';
        break;
      case '6':
        previous = 'x';
        break;
      case '7':
        previous = 'n';
        break;
      case '8':
        previous = 't';
        break;
      case '9':
        previous = 'e';
        break;
      default:
        previous = previous;
    }
  }
  return previous;
};

module.exports = switchPrevious;
