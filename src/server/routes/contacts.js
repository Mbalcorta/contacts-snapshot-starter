const contacts = require('../../models/contacts')
const router = require('express').Router()
const { hasPermissions } = require('../authorization.js')

router.get('/new', (request, response) => {
  if(hasPermissions(request.session.user.role, 'createContact')){
    response.render('contacts/new', { signup: false, home: false, welcome: true, access: request.session.user.role })    
  } else {
    response.status(403).render('common/unauthorized', {signup: false, home: false, welcome: true, access: request.session.user.role})
  }
})

router.post('/', (request, response, next) => {
  contacts.create(request.body)
    .then(function(contact) {
      if (contact) return response.redirect(`/contacts/${contact[0].id}`)
      next()
    })
    .catch( error => next(error) )
})

router.get('/:contactId', (request, response, next) => {
  const contactId = request.params.contactId
  if (!contactId || !/^\d+$/.test(contactId)) return next()
  contacts.findById(contactId)
    .then(function(contact) {
      if (contact) return response.render('contacts/show', { contact, signup: false, home: false, welcome: true,  access: request.session.user.role})
      next()
    })
    .catch( error => next(error) )
})


router.delete('/:contactId', (request, response, next) => {
  if(hasPermissions(request.session.user.role, 'deleteContact')){
    const contactId = request.params.contactId
    contacts.destroy(contactId)
    .then(function(contact) {
      if (contact) return response.redirect('/')
      next()
    })
    .catch( error => next(error) )
  } else {
    response.status(403).render('common/unauthorized', {signup: false, home: false, welcome: true})
  }
})

router.get('/search', (request, response, next) => {
  const query = request.query.q
  contacts.search(query)
    .then(function(contacts) {
      if (contacts) return response.render('contacts/index', { query, contacts, signup: false, home: false, welcome: true, access: request.session.user.role })
      next()
    })
    .catch( error => next(error) )
})

module.exports = router
