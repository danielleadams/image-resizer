var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/local.db');

db.serialize(() => {
  db.run("CREATE TABLE users(email TEXT, password_hash TEXT);", (e) => {
    if (e) {
      console.log("This table already exists. If you want to reset the db, run 'yarn db:reset'.");
    } else {
      console.log("User table created.");
    }
  });

  db.run("CREATE TABLE images(image UUID, caption TEXT);", (e) => {
    if (e) {
      console.log("This table already exists. If you want to reset the db, run 'yarn db:reset'.");
    } else {
      console.log("Image table created.");
    }
  })
});

db.close();
