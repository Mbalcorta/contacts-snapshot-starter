const expect = require('chai').expect
const mocha = require('mocha')
const { resetDB } = require('../../helpers/db')
const { create, findAll, findById, destroy, search } = require('../../../src/models/contacts')

describe('Contacts query functions', function() {
  
  describe('Find all query', function(){
    beforeEach(resetDB)
  
    it('will return all contacts', async function(){
      const contacts = await findAll()
      expect(contacts).to.be.an('array')
    })
    
    it('will return three contacts', async function(){
      const contacts = await findAll()
      expect(contacts).to.have.lengthOf(3)
    })
  })
  
  describe('Create query', function(){
    beforeEach(resetDB)
    const contact = {
      first_name: 'sebastian',
      last_name: 'maillet'
    }
    it('will return an array', async function(){
       const data = await create(contact)
        expect(data).to.be.an('array')
    })
    it('will create a new contact', async function(){
       const data = [await create(contact), await findAll()]
        expect(data[0]).to.have.lengthOf(1)
    })
    it('will create one new contact', async function(){
       const data = [await create(contact), await findAll()]
       const contactName = JSON.stringify(data[0][0].first_name)
        expect(contactName).to.equal('"sebastian"')
    })
    it('will create add new contact to contacts database', async function(){
       const data = [await create(contact), await findAll()]
        expect(data[1]).to.have.lengthOf(4)
    })
  })
})

