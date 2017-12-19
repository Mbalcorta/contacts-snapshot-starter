const bcrypt = require('bcrypt');

const encrypt = (plainPassword) => {
  const saltRounds = 10;
  return bcrypt.hash(plainPassword, saltRounds)
}

const decrypt = (plainPassword, hash) => {
  return bcrypt.compare(plainPassword, hash)
}
module.exports = { encrypt, decrypt }