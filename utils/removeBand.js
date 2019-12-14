const { ProBand } = require('../db/mongoose');

const removeBand = async name => {
  try {
    await ProBand.deleteOne({ name });
    return true;
  } catch (e) {
    console.log(e.message);
    return e;
  }
};

module.exports = removeBand;
