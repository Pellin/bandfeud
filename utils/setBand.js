const { Band } = require('../db/mongoose');

const setBand = async (name, imgUrl, discogsId) => {
  try {
    let bandAdded = new Band({
      name,
      imgUrl,
      discogsId
    });
    await bandAdded.save();
    return true;
  } catch (e) {
    return e;
  }
};

module.exports = setBand;
