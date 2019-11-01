const { ProBand} = require('../db/mongoose');

const setProBand = async (name, imgUrl, discogsId) => {
  try {
    let bandAdded = new ProBand({
      name,
      imgUrl,
      discogsId
    });
    await bandAdded.save();
    return true;
  } catch (e) {
    return e;
  }
}

module.exports = setProBand;