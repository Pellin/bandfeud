const { Band } = require('../db/mongoose');

const getBand = async (previous, used) => {
  const expression = '^\W*' + previous + '[ws,-.]*';
  const regexp = new RegExp(expression, 'i');

  return new Promise(async (resolve, reject) => {
    try {
      let bands = await Band.find({ name: regexp });
      console.log(bands.length);
      for (let band of bands) {
        if (band.name.match(/.*, the$/)) {
          let split = band.name.split(',');
          split = split[0];
          band.name = 'the ' + split;
        }
      }
      bands = bands.filter(band => !used.includes(band.name));
      const rnd = Math.floor(Math.random() * bands.length);
      const { name, url } = bands[rnd];

      resolve({
        name,
        url
      });
    } catch (e) {
      console.log(e.message);
      reject();
    }
  });
};

module.exports = getBand;
