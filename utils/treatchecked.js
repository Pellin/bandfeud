const andFix = require('./serverutils/andFix');
const regExpFix = require('./serverutils/regExpFix');
const theFix = require('./serverutils/theFix');
const getProxy = require('./serverutils/getProxy');

const treatChecked = async (userBand, bands) => {
  bands = bands.results;
  if (bands.length > 5) {
    bands.length = 5;
  }

  bands = bands.filter(band => {
    return !band.cover_image.match(/^.*spacer\.gif$/);
  });
  if (bands.length) {
    for (let i = 0; i < bands.length; i++) {
      if (bands[i].title.includes(')')) {
        let split = bands[i].title.split('(');
        split = split[0];
        bands[i].title = split.trim();
      }
    }
    if (
      userBand.match(/^the .+$/) ||
      bands[0].title.toLowerCase().match(/^the .+$/)
    ) {
      userBand = theFix(userBand, bands[0].title.toLowerCase());
    }

    userBand = andFix(userBand, bands);
    userBand = regExpFix(userBand, bands[0].title.toLowerCase());
    let nameMatches = [];
    let imgMatches = [];
    let idMatches = [];

    for (let i = 0; i < bands.length; i++) {
      bands[i].title = bands[i].title.toLowerCase();
      if (bands[i].title === userBand || getProxy(bands[i].title) === userBand )  {
        nameMatches.push(bands[i].title);
        imgMatches.push(bands[i].cover_image);
        idMatches.push(bands[i].id);
      }
    }
    if (nameMatches.length) {
      return {
        name: nameMatches[0],
        imgUrl: imgMatches[0],
        discogsId: idMatches[0]
      };
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = treatChecked;
