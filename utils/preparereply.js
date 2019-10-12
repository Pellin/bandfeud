const createBands = require('./serverutils/createBands');
const switchPrevious = require('./serverutils/switchPrevious');
const { Band } = require('../db/mongoose');
const backupBands = require('./backupbands');

const prepareReply = async (albums, previous, used) => {
  let answer,
    reply,
    serverBandBank = [],
    theArray = [];

  const genres = [
    'Rock',
    'Pop',
    'Hip Hop',
    'Electronic',
    'Funk / Soul',
    'Reggae'
  ];

  //If previous is a number, switch it to a letter
  previous = switchPrevious(previous);

  //No 'spacer' images (returns null)
  albums.results = albums.results.filter(
    album => !album.cover_image.match(/^.*spacer\.gif$/)
  );

  //Limit by poularity
  albums.results = albums.results.filter(album => album.community.have > 50);

  //Limit by genre
  albums.results = albums.results.filter(album =>
    genres.includes(album.genre[0])
  );

  //Make Band objects
  let bandArray = createBands(albums);

  //Split by () and *
  for (let i = 0; i < bandArray.length; i++) {
    if (bandArray[i].name.includes(')')) {
      let split = bandArray[i].name.split('(');
      bandArray[i].name = split[0].trim();
    }
    if (bandArray[i].name[bandArray[i].name.length - 1] == '*') {
      bandArray[i].name = bandArray[i].name.slice(0, -1);
    }
  }

  //Only a-z or 1-9 at end:
  bandArray = bandArray.filter(band => band.name.match(/[a-z1-9]$/));

  //Filter out short & long names
  bandArray = bandArray.filter(
    band => band.name.length > 2 && band.name.length < 20
  );

  //Filtering out non-alphanumeric chars & generic words
  bandArray = bandArray.filter(band => band.name.match(/^[\w\s\.]*$/));
  bandArray = bandArray.filter(band => !band.name.includes('presents'));
  bandArray = bandArray.filter(band => !band.name.includes('various'));
  bandArray = bandArray.filter(band => !band.name.includes('feat'));
  bandArray = bandArray.filter(band => !band.name.includes('featuring'));
  bandArray = bandArray.filter(band => !band.name.includes('no artist'));
  bandArray = bandArray.filter(band => !band.name.includes('unknown artist'));

  // bandArray = bandArray.filter(band => !band.name.match(/^.*\, the/));

  //Remove duplicates
  bandArray = bandArray.filter(
    (bandArray, index, self) =>
      index === self.findIndex(b => b.name === bandArray.name)
  );

  //Remove faulty contributions
  for (let i = bandArray.length - 1; i >= 0; i--) {
    if (
      bandArray[i].name === 'elvis' ||
      bandArray[i].name === 'presley' ||
      bandArray[i].name === 'bob' ||
      bandArray[i].name === 'eek' ||
      bandArray[i].name === 'dylan' ||
      bandArray[i].name === 'david' ||
      bandArray[i].name === 'bowie' ||
      bandArray[i].name === 'nile' ||
      bandArray[i].name === 'neil' ||
      bandArray[i].name === 'otis' ||
      bandArray[i].name === 'petshopboys' ||
      bandArray[i].name === 'rollingstones' ||
      bandArray[i].name === 'ubu' ||
      bandArray[i].name === 'englandneworder' ||
      bandArray[i].name === 'neworder' ||
      bandArray[i].name === 'eazy' ||
      bandArray[i].name.match(/^les\s/)
    ) {
      bandArray.splice(i, 1);
    }
  }

  //Remove already used
  bandArray = bandArray.filter(band => !used.includes(band.name));

  //Push correct 'the'-bands to theArray
  //Push incorrect 'the'-bands to serverBandBank, remove them from bandArray
  const regex = new RegExp('^the ' + previous + '.*');
  for (let i = bandArray.length - 1; i >= 0; i--) {
    if (bandArray[i].name.match(regex)) {
      theArray.push(bandArray[i]);
    } else {
      serverBandBank.push(bandArray[i]);
      bandArray.splice(i, 1);
    }
  }

  //Push all but used to serverBandBank
  for (let i = 0; i < bandArray.length; i++) {
    if (!used.includes(bandArray[i].name)) {
      serverBandBank.push(bandArray[i]);
    }
  }

  //Remove incorrect bands from bandArray
  bandArray = bandArray.filter(band => band.name[0] === previous);

  //Merge theArray and bandArray
  bandArray = bandArray.concat(theArray);

  //Remove all DJ:s from serverBandBank
  serverBandBank = serverBandBank.filter(
    band => band.name[0] != 'd' && band.name[1] != 'j' && band.name[2] != ' '
  );

  //STATUS:
  //bandArray - Only correct answers (might be empty)
  //serverBandBank - All answers

  //CONSTRUCT REPLY:
  if (!bandArray.length) {
    let newBands = JSON.parse(JSON.stringify(serverBandBank));
    answer = await backupBands(previous, newBands, used);
  } else {
    const rnd = Math.floor(Math.random() * bandArray.length);
    answer = bandArray[rnd];

    try {
      const addBand = new Band({
        name: answer.name,
        url: answer.url
      });
      const addedBand = await addBand.save();
      console.log(`Added ${addedBand.name}`);
    } catch (e) {
      console.log(e.message);
    }
  }

  serverBandBank = serverBandBank.filter(band => band.name != answer.name);

  reply = {
    answer,
    serverBandBank
  };

  return reply;
};

module.exports = prepareReply;
