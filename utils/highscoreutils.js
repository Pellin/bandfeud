require('../config/config');

const { Highscore } = require('../db/mongoose');

const checkTop20 = async score => {
  try {
    let highscores = await Highscore.find();
    highscores = highscores.sort((a, b) => (a.score > b.score ? -1 : 1));
    if (score > highscores[highscores.length - 1].score) {
      return true;
    }
    return false;
  } catch (e) {
    console.log(`Unable to connect to database: ${e.message}`);
  }
};

const addHighscore = async (score, player, date) => {
  try {
    let highscore = new Highscore({
      score,
      player,
      date
    });

    await highscore.save();
    let highscores = await Highscore.find();
    highscores = highscores.sort((a, b) => (a.score > b.score ? -1 : 1));
    if (highscores.length > 20) {
      let id = highscores[highscores.length - 1]._id;
      await Highscore.findOneAndDelete({ _id: id });
      highscores = await Highscore.find();
      highscores = highscores.sort((a, b) => (a.score > b.score ? -1 : 1));
    }
    return true;
  } catch (e) {
    return e;
  }
};

const getHighscores = async () => {
  try {
    highscores = await Highscore.find();
    highscores = highscores.sort((a, b) => (a.score > b.score ? -1 : 1));
    return highscores;
  } catch (e) {
    console.log('Unable to connect to database');
  }
};

module.exports = { checkTop20, addHighscore, getHighscores };
