const { Band } = require('../db/mongoose');

const removeBand = async name => {
  console.log(name)
  try {
    await Band.deleteOne({ name });
    return true;
  } catch (e) {
    console.log(e.message);
    return e;
  }
};

module.exports = removeBand;