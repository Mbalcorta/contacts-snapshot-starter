const db  = require('../../src/models/db/db')

async function initDb() {
  const tables = ['contacts', 'users', 'session']
    await Promise.all(tables.map(table => 
     db.oneOrNone(`TRUNCATE TABLE ${table} RESTART IDENTITY CASCADE`)
   ))
  .catch(console.error)
}

async function seedContacts() {
  const sql = 'INSERT INTO contacts(first_name, last_name) VALUES(${first_name}, ${last_name})'
  const contacts = [{first_name: 'Jared', last_name: 'Grippe'}, {first_name: 'Tanner', last_name: 'Welsh'}, {first_name: 'NeEddra', last_name: 'James'}]
  
   await Promise.all(contacts.map(contact => 
     db.oneOrNone(sql, contact)
   ))
  .catch(console.error)
}

const resetDB = async function(){
 await Promise.all([initDb(), seedContacts()])
}
    
module.exports = { resetDB }