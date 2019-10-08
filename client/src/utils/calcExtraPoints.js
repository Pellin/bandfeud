const calcExtraPoints = (timeLeft, name, difficulty) => {
  let firstLetter = name[0];
  if (name.match(/^the /)) {
    firstLetter = name[4];
  }
  name = name.replace(/\s-\.&/g, '');
  let points = Math.round(name.length / 2);
  let letterPoints = 0;
  switch (firstLetter) {
    case 'a':
      letterPoints = 1;
      break;
    case 'b':
      letterPoints = 1;
      break;
    case 'e':
      letterPoints = 1;
      break;
    case 'f':
      letterPoints = 1;
      break;
    case 'g':
      letterPoints = 1;
      break;
    case 'h':
      letterPoints = 1;
      break;
    case 'i':
      letterPoints = 2;
      break;
    case 'j':
      letterPoints = 2;
      break;
    case 'k':
      letterPoints = 3;
      break;
    case 'l':
      letterPoints = 1;
      break;
    case 'o':
      letterPoints = 3;
      break;
    case 'p':
      letterPoints = 2;
      break;
    case 'q':
      letterPoints = 5;
      break;
    case 't':
      letterPoints = 2;
      break;
    case 'u':
      letterPoints = 4;
      break;
    case 'v':
      letterPoints = 3;
      break;
    case 'w':
      letterPoints = 3;
      break;
    case 'x':
      letterPoints = 5;
      break;
    case 'y':
      letterPoints = 5;
      break;
    case 'z':
      letterPoints = 5;
      break;
    default:
      letterPoints = 0;
  }

  switch (difficulty) {
    case 15:
      points = Math.round((points + letterPoints) * 1.5 + timeLeft * 0.3);
      break;
    case 10:
      points = Math.round((points + letterPoints) * 2 + timeLeft * 1.2);
      break;
    case 5:
      points = Math.round((points + letterPoints) * 3 + timeLeft * 4.5);
      break;
    default:
      points = points + letterPoints;
  }
  return points;
};

export default calcExtraPoints;
