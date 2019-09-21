require('./config/config');

const express = require('express');
const PORT = process.env.PORT;

const checkBand = require('./utils/checkband');
const treatChecked = require('./utils/treatchecked');
const getBand = require('./utils/getband');
const getImg = require('./utils/getimg');
const {
  checkTop20,
  addHighscore,
  getHighscores
} = require('./utils/highscoreutils');

const app = express();

app.post('/api/checkband', async (req, res) => {
  try {
    const bands = await checkBand(req.query.name);
    const parsedBands = JSON.parse(bands);
    const band = treatChecked(req.query.name, parsedBands);
    res.json(band);
  } catch (e) {
    console.log(e);
    res.status(200).send();
  }
});

app.get('/api/getband', async (req, res) => {
  try {
    const used = JSON.parse(req.query.used);
    const reply = await getBand(req.query.previous, used);
    res.json(reply);
  } catch (e) {
    console.log(e);
    res.status(200).send();
  }
});

app.get('/api/getimg', async (req, res) => {
  try {
    const url = await getImg(req.query.name);
    res.status(200).json(url);
  } catch (e) {
    console.log(e);
    res.status(204).send();
  }
});

app.get('/api/checkhighscore', async (req, res) => {
  let score = req.query.score;
  let top20 = await checkTop20(score);
  if (top20) {
    res.status(202).send();
  } else {
    res.status(204).send();
  }
});

app.post('/api/sethighscore', async (req, res) => {
  try {
    await addHighscore(req.query.score, req.query.player, req.query.date);
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
});

app.get('/api/gethighscores', async (_req, res) => {
  const highscores = await getHighscores();
  res.json(highscores);
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(_dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Started on port ${PORT}`);
});
