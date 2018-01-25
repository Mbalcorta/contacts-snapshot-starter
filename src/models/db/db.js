const pgp = require('pg-promise')()

let connectionString

if(process.env.NODE_ENV === 'test'){
  connectionString =  'postgres://localhost:5432/contacts_test'
} else {
  // connectionString = 'postgres://localhost:5432/contacts_test'
  connectionString = process.env.DATABASE_URL
}

const db = pgp({connectionString})

module.exports = db
