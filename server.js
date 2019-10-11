require('./config/config');

const express = require('express');
const PORT = process.env.PORT;

const app = express();
app.use(express.json());

require('./routes/bandRoutes')(app);
require('./routes/highscoreRoutes')(app);

app.listen(PORT, () => {
  console.log(`Started on port ${PORT}`);
});


