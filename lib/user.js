var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/local.db');

class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  async create() {
    db.run(`INSERT INTO users(email, password) VALUES('${this.email}','${this.password}');`);
  }

  async find() {
    db.get(`SELECT * FROM users WHERE email='${this.email}' AND password='${this.password}';`, (_, r) => {
      return r;
    });
  }
}

module.exports = User;
