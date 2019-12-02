const calcExtraPoints = (timeLeft, name, difficulty, os) => {
  let firstLetter = name[0];
  if (name.match(/^the /)) {
    firstLetter = name[4];
  }
  name = name.replace(/\s-\.&/g, '');
  let points = Math.round(name.length);
  let letterPoints = 0;
  switch (firstLetter) {
    case '0': 
      letterPoints = 8;
      break;
      case '1': 
      letterPoints = 4;
      break;
      case '2': 
      letterPoints = 4;
      break;
      case '3': 
      letterPoints = 5;
      break;
      case '4': 
      letterPoints = 4;
      break;
      case '5': 
      letterPoints = 8;
      break;
      case '6': 
      letterPoints = 8;
      break;
      case '7': 
      letterPoints = 7;
      break;
      case '8': 
      letterPoints = 7;
      break;
      case '9': 
      letterPoints = 7;
      break;
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
      points = os === 'desktop' ? Math.round((points + letterPoints) * 1.5 + timeLeft * 0.3) : Math.round((points * 4 + letterPoints * 4 + timeLeft) * 0.4) ;
      break;
    case 10:
      points = os === 'desktop' ? Math.round((points + letterPoints) * 2 + timeLeft * 1.2) : Math.round((points * 2.4 + letterPoints * 4 + timeLeft) * 0.9);
      break;
    case 5:
      points = os === 'desktop' ? Math.round((points + letterPoints) * 3 + timeLeft * 4.5) : Math.round((points * 4 + letterPoints * 3 + timeLeft) * 1.3);
      break;
    default:
      points = os === 'desktop' ? points + letterPoints : Math.round((points * 5 + letterPoints * 2 + timeLeft) * 0.22);
    }
  return points;
};

export default calcExtraPoints;
