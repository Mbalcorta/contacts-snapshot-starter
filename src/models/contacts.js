const db = require('./db/contacts');


// additional functions which operate on `contacts` data will go here

module.exports = {
  findByEmail : db.findByEmail,
  create: db.create,
  findAll: db.findAll,
  findById: db.findById,
  destroy: db.destroy,
  search: db.search
}
