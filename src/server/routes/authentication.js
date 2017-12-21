const router = require('express').Router()
const db = require('../../models/authentication.js')
const { encrypt, decrypt } = require('../../models/padlock.js')
const { hasPermissions } = require('../authorization.js')

const session = (session) => {
  session.email = email
}

const createSession = (session, member) => {
  session.user = member
}

router.get('/login', (request, response) => {
    response.render('login', {signup: false,  email: request.session.user ? request.session.user.email : false, welcome: false, wrongPassword: false, loggedOut: false, home: false })
})

router.post('/login', (request, response, next) => {
  const { email, password } = request.body
  //get member object and check passwords
  db.findByEmail(email)
  .then((member) => {
    const { encrypted_password } = member
    decrypt(password, encrypted_password)
    .then((authorized) => {
      if(authorized){
        createSession(request.session, member)
        response.redirect('/')
      } else { 
       response.render('login', {email: false, wrongPassword: true, signup: false, welcome: false, home: false})
      }
    })
  })
  .catch((error) => {
    console.log(error)
    next()
  })
})

router.get('/signup', (request, response) => {
    response.render('signup', {signup: true})
})

router.post('/signup', (request, response) => {
  const { email, password, role } = request.body
  encrypt(password)
  .then((encrypted_password) => {
    db.create({email, encrypted_password, role})
    .then((member) => {
      createSession(request.session, {email: email, role: role})
      response.redirect('/')
    })
    .catch((error) => {
      console.log(error)
      if(error.code === '23505'){
      session(request.session, email)
      response.redirect('/login')
      }
    }) 
  })
})

router.get('/logout', (request, response) => {
  request.session.destroy(() => {
    response.redirect('/login')
  })
})

module.exports = router