const {
  checkTop20,
  addHighscore,
  getHighscores
} = require('../utils/highscoreutils');

module.exports = app => {
  app.get('/api/checkhighscore', async (req, res) => {
    let score = req.query.score;
    let top20 = await checkTop20(score);
    if (top20) {
      res.status(202).send();
    } else {
      res.status(204).send();
    }
  });

  app.get('/api/gethighscores', async (_req, res) => {
    const highscores = await getHighscores();
    res.json(highscores);
  });

  app.post('/api/sethighscore', async (req, res) => {
    try {
      await addHighscore(
        req.body.score,
        req.body.player,
        req.body.date,
        req.body.bands
      );
      res.status(200).send();
    } catch (e) {
      console.log(e.message);
      res.status(400).send(e.message);
    }
  });
};
