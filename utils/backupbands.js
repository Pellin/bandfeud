const { Band } = require('../db/mongoose');

const backupBands = async (previous, newBands, used) => {
  let answer = {};
  const expression = '^' + previous + '[ws,-]*';
  const regex = new RegExp(expression, 'i');

  return new Promise(async (resolve, reject) => {
    try {
      let bands = await Band.find({ name: regex });
      for (let band of bands) {
        if (band.name.includes(',')) {
          let split = band.name.split(',');
          split = split[0];
          band.name = 'the ' + split;
        }
      }
      bands = bands.filter(band => !used.includes(band.name));
      const rnd = Math.floor(Math.random() * bands.length);
      answer = bands[rnd];

      // for (let band of newBands) {
      //   if (
      //     band.name[0] === 't' &&
      //     band.name[1] === 'h' &&
      //     band.name[2] === 'e' &&
      //     band.name[3] === ' '
      //   ) {
      //     let str = band.name.slice(4, band.name.length);
      //     band.name = str + ', the';
      //   }
      // }
      // if (newBands.length) {
      //   try {
      //     const addedBands = await Band.insertMany(newBands, {
      //       ordered: false
      //     });
      //     console.log(`Success, added ${addedBands.length} bands.`);
      //   } catch (e) {
      //     console.log('Not all bands added');
      //     console.log(e.message);
      //   }
      // }

      resolve({
        name: answer.name,
        url: answer.url
      });
    } catch (e) {
      console.log(e.message);
      reject();
    }
  });
};

module.exports = backupBands;
