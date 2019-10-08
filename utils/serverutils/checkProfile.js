const request = require('request');

const checkProfile = uri => {
  console.log(uri);
  const options = {
    url: `https://www.discogs.com/${uri}`
  };
  return new Promise((resolve, reject) => {
    request(options, (err, res, body) => {
      if (!err && res.statusCode === 200) {
        resolve();
      } else {
        reject(err);
      }
    });
  });
};

module.exports = checkProfile;
