const createBands = albums => {
  let arr = [];
  class Band {
    constructor(band, url) {
      this.name = band;
      this.url = url;
    }
  }

  for (let album of albums.results) {
    let newBand = new Band(album.title, album.cover_image);
    let str = newBand.name;
    let strArray = str.split('-');
    newBand.name = strArray[0].trim().toLowerCase();
    arr.push(newBand);
  }
  return arr;
};

module.exports = createBands;
