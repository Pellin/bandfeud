const request = require('request');

const checkProfile = url => {
  const options = {
    url,
    headers: {
      'User-Agent': 'Bandfeud'
    }
  };
  return new Promise((resolve, reject) => {
    request(options, (err, res, body) => {
      if (!err && res.statusCode === 200) {
        resolve(body);
      } else {
        reject(err);
      }
    });
  });
};

module.exports = checkProfile;
