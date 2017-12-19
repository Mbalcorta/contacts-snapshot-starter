const db = require('./db/authentication');


// additional functions which operate on `contacts` data will go here

module.exports = {
  create: db.create,
  findByEmail: db.findByEmail
}
