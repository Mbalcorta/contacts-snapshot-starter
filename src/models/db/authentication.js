const conn = require('./db')

const create = (member) => {
  return conn.query('INSERT INTO users (email, encrypted_password, role) VALUES(${email}, ${encrypted_password}, ${role})'
          , member)
};

const findByEmail = (email) => {
  return conn.oneOrNone('SELECT * FROM users WHERE email = $1', [email])
  .catch(error => {
    throw error
  })
}

module.exports = {create, findByEmail};