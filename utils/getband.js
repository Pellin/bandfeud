const request = require('request');

const letterGenerator = require('./serverutils/letterGenerator');
const prepareReply = require('./preparereply');

const getBand = async (previous, used) => {
  let letters = letterGenerator();
  let page = Math.round(Math.random() * 90);
  if (page === 0) page = 1;
  const options = {
    url: `https://api.discogs.com/database/search?q=${letters}&page=${page}&per_page=100&type=release&key=${process.env.DC_KEY}&secret=${process.env.DC_SECRET}`,
    headers: {
      'User-Agent': 'Bandfeud',
      Accept: 'application/vnd.discogs.v2.discogs+json',
      SameSite: 'None'
    }
  };

  return new Promise((resolve, reject) => {
    request(options, (err, res, body) => {
      if (!err && res.statusCode == 200) {
        const albums = JSON.parse(body);
        const reply = prepareReply(albums, previous, used);

        resolve(reply);
      } else {
        reject(err.message);
      }
    });
  });
};

module.exports = getBand;
