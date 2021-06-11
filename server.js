require('./config/config');

const express = require('express');
const PORT = process.env.PORT;

const app = express();
app.use(express.json());

require('./routes/bandRoutes')(app);
require('./routes/highscoreRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');

  app.get("/sitemap.xml", (req, res, next) => {
    res.sendFile(path.resolve(__dirname, 'public', 'sitemap.xml'));
  });
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(_dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Started on port ${PORT}`);
});


