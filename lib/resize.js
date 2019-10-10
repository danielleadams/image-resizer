const sharp = require("sharp");
const uuidv4 = require("uuid/v4");
const path = require("path");

class Resize {
  constructor(folder) {
    this.folder = folder;
  }

  async save(file, size) {
    const buffer = file.buffer;
    const filename = Resize.filename();
    const filepath = this.filepath(filename);

    await sharp(buffer)
      .resize(size, size)
      .toFile(filepath);

    return filename;
  }

  static filename() {
    return `${uuidv4()}.jpg`;
  }

  filepath(filename) {
    return path.resolve(`${this.folder}/${filename}`);
  }
}

module.exports = Resize;
