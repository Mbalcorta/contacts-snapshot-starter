const router = require('express').Router()
const contactsRoutes = require('./contacts')
const contacts = require('../../models/contacts')
const middlewares = require('../middlewares')
const authRouter = require('./authentication')
const { hasPermissions } = require('../authorization.js')

const loggedIn = (request, response, next) => {
  if(request.session.user){
    next()
  } else {
    response.redirect('/signup')
  }
}

router.use('/', authRouter)
router.use(loggedIn)

router.get('/', (request, response, next) => {
  if(request.session.user) {
    if(hasPermissions(request.session.user.role, 'viewIndex')){
      contacts.findAll()
      .then((contacts) => {response.render('contacts/index', { contacts, signup: false, home: false, welcome: true, access: request.session.user.role })})
      .catch( error => next(error) )
     } else {
      response.status(403).render('common/unauthorized', {signup: false, home: false, welcome: true})
      }
    } else {
    response.redirect('/signup')
  }
})

router.use('/contacts', contactsRoutes);

router.use(middlewares.logErrors);
router.use(middlewares.errorHandler);
router.use(middlewares.notFoundHandler)

module.exports = router;
