var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/local.db');
var bcrypt = require("bcrypt");

const saltRounds = 10;

class User {
  async create(email, password) {
    bcrypt.hash(password, saltRounds, function(_, hash) {
      db.run(`INSERT INTO users(email, password_hash)
        VALUES('${email}','${hash}');`);
    });
  }

  async find(email, password, matchFn) {
    db.get(`SELECT * FROM users WHERE email='${email}';`, async (_, rec) => {
      bcrypt.compare(password, rec.password_hash).then(function(match) {
        matchFn(match);
      });
    });
  }
}

module.exports = User;
