var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/local.db');

class Image {
  constructor(image, caption) {
    this.url = `/images/${image}.jpg`;
    this.caption = caption;
  }

  static all(callback) {
    return db.all(`SELECT * FROM images;`, (_, r) => {
      const images = r.map((img) => {
        return new Image(img.image, img.caption);
      });
      callback(images);
    });
  }
}

module.exports = Image;
