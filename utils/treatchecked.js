const theFix = require('./serverutils/theFix');
const dotFix = require('./serverutils/dotFix');

const treatChecked = (userBand, bands) => {
  bands = bands.results;
  if (bands.length > 5) {
    bands.length = 5;
  }
  for (let i = 0; i < bands.length; i++) {
    if (bands[i].title.includes(')')) {
      let split = bands[i].title.split('(');
      split = split[0];
      bands[i].title = split.trim();
    }
  }

  if (
    userBand.includes('the') ||
    bands[0].title.toLowerCase().includes('the')
  ) {
    userBand = theFix(userBand, bands[0].title.toLowerCase());
  }

  userBand = dotFix(userBand);

  let nameMatches = [];
  let imgMatches = [];

  for (let i = 0; i < bands.length; i++) {
    bands[i].title = bands[i].title.toLowerCase();
    if (bands[i].title === userBand) {
      nameMatches.push(bands[i].title);
      imgMatches.push(bands[i].cover_image);
    }
  }
  if (nameMatches.length) {
    return {
      name: nameMatches[0],
      imgUrl: imgMatches[0]
    };
  } else {
    return null;
  }
};

module.exports = treatChecked;
