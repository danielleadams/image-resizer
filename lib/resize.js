const sharp = require("sharp");
const uuidv4 = require("uuid/v4");
const path = require("path");
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/local.db');


class Resize {
  constructor(folder) {
    this.folder = folder;
  }

  async save(file, size, caption) {
    console.log("Creating image...");

    const buffer = file.buffer;
    const filename = Resize.filename();
    const filepath = this.filepath(filename);

    await sharp(buffer)
      .resize(size, size)
      .toFile(filepath);

    db.run(`INSERT INTO images(image, caption) VALUES('${filename}','${caption}');`);

    console.log("Created.");

    return filename;
  }

  static filename() {
    return uuidv4();
  }

  filepath(filename) {
    return path.resolve(`${this.folder}/${filename}.jpg`);
  }
}

module.exports = Resize;
