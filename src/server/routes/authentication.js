const router = require('express').Router()
const db = require('../../models/authentication.js')
const { encrypt, decrypt } = require('../../models/padlock.js')

const session = (session, exist, email, signup, welcome) => {
  session.emailExist = exist
  session.email = email
  session.signup = signup
  session.welcome = welcome
}

const createSession = (session, member) => {
  session.user = member
}

router.get('/login', (request, response) => {
  response.render('login', {signup: request.session.signup, emailExist: request.session.emailExist, email: request.session.email, welcome: false, wrongPassword: false, loggedOut: false })
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
        response.redirect('/index')
      } else {
        response.render('login', {emailExist: false, wrongPassword: true, signup: false, welcome: false})
      }
    })
  })
  .catch((error) => {
    console.log(error)
    next()
  })
})

router.get('/index', (request, response) => {
  const emailValue = request.session.user ? request.session.user.email : false
  response.render('index', { email: emailValue, welcome: true, signup: false})
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
      response.redirect('/index')
    })
    .catch((error) => {
      console.log(error)
      if(error.code === '23505'){
      session(request.session, true, email, false, false)
      response.redirect('/login')
      }
    }) 
  })
})

router.get('/logout', (request, response) => {
  response.render('login', {loggedOut: true, emailExist: false, wrongPassword: false, signup: true})
})

module.exports = router