const request = require('request');

const getProxy = require('./serverutils/getProxy');

const checkBand = band => {
  let proxy = getProxy(band);
  let options = {
    url: `https://api.discogs.com/database/search?q=${proxy}&type=artist&key=${process.env.DC_KEY}&secret=${process.env.DC_SECRET}`,
    headers: {
      'User-Agent': 'Bandfeud',
      Accept: 'application/vnd.discogs.v2.discogs+json',
      SameSite: 'None'
    }
  };

  return new Promise((resolve, reject) => {
    request(options, (err, res, body) => {
      console.log(res.headers['x-discogs-ratelimit-remaining']);
      if (!err && res.statusCode == 200) {
        resolve(body);
      } else {
        reject('Unable to fetch band');
      }
    });
  });
};

module.exports = checkBand;
