const checkBand = require('../utils/checkband');
const treatChecked = require('../utils/treatchecked');
const getBand = require('../utils/getband');
const getImg = require('../utils/getimg');

module.exports = app => {
  app.get('/api/checkband', async (req, res) => {
    console.log(req.query.name);
    try {
      const bands = await checkBand(req.query.name);
      const parsedBands = JSON.parse(bands);
      const band = await treatChecked(req.query.name, parsedBands);
      res.json(band);
    } catch (e) {
      console.log(e);
      res.status(200).send();
    }
  });

  app.get('/api/getband', async (req, res) => {
    try {
      const reply = await getBand(req.query.previous, req.query.used);
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
};
