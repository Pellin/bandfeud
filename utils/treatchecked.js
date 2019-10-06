const checkProfile = require('./serverutils/checkProfile');
const theFix = require('./serverutils/theFix');
const dotFix = require('./serverutils/dotFix');

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
      userBand.match(/^the\\s/) ||
      bands[0].title.toLowerCase().match(/^the\\s/)
    ) {
      userBand = theFix(userBand, bands[0].title.toLowerCase());
    }

    userBand = dotFix(userBand);

    let nameMatches = [];
    let imgMatches = [];
    let urls = [];

    for (let i = 0; i < bands.length; i++) {
      bands[i].title = bands[i].title.toLowerCase();
      if (bands[i].title === userBand) {
        nameMatches.push(bands[i].title);
        imgMatches.push(bands[i].cover_image);
        urls.push(bands[i].resource_url);
      }
    }

    if (nameMatches.length) {
      try {
        const profile = await checkProfile(urls[0]);
        if (profile && !profile.match(/producer/gim) && !profile.match(/designer/gim)) {
          return {
            name: nameMatches[0],
            imgUrl: imgMatches[0]
          };
        } else {
          return null;
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = treatChecked;
