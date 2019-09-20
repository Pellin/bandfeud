const request = require('request');

const getProxy = require('./serverutils/getProxy');

const getImg = band => {
  let proxy = getProxy(band);

  let options = {
    url: `https://api.discogs.com/database/search?q=${proxy}&type=artist&key=${process.env.DC_KEY}&secret=${process.env.DC_SECRET}`,
    headers: {
      'User-Agent': 'Bandfeud'
    }
  };

  return new Promise((resolve, reject) => {
    request(options, (err, res, body) => {
      if (!err && res.statusCode == 200) {
        let parsedBody = JSON.parse(body);
        let url = 'https://www.discogs.com/images/discogs-white.png?5';
        if (parsedBody.results.length) {
          if (parsedBody.results[0].cover_image != undefined) {
            url = parsedBody.results[0].cover_image;
          }
        }
        resolve(url);
      } else {
        reject('no img');
      }
    });
  });
};

module.exports = getImg;
