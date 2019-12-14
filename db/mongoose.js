const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI_PROD, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
});

const Band = mongoose.model('Band', {
  name: {
    type: String,
    unique: true
  },
  imgUrl: {
    type: String
  },
  discogsId: {
    type: Number,
    required: true,
    unique: true
  }
});

const ProBand = mongoose.model('ProBand', {
  name: {
    type: String,
    unique: true,
    required: true
  },
  imgUrl: {
    type: String,
    required: true
  },
  discogsId: {
    type: Number
  }
});

const Highscore = mongoose.model('Highscore', {
  score: {
    type: Number,
    required: true,
    minlength: 1,
    trim: true
  },
  player: {
    type: String,
    required: true
  },
  date: {
    type: Number,
    required: true,
    default: null
  },
  bands: {
    type: Array,
    required: true,
    default: []
  }
});

module.exports = {
  Band,
  ProBand,
  Highscore
};
