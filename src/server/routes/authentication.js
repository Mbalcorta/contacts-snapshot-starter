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
  if(request.session.user){
    response.locals.email = request.session.user.email  
  }
    response.render('login')
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
       response.render('login', { wrongPassword: true })
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
  console.log(email)
  db.findByEmail(email)
    .then((member) => {
      if(member){
        console.log(member)
        session(request.session, member.email)
        response.redirect('/login')  
      } else {
        encrypt(password)
        .then((encrypted_password) => {
          db.create({email, encrypted_password, role})
          .then((member) => {
            createSession(request.session, {email: email, role: role})
            response.redirect('/')
          })
          .catch((error) => {
            if(error.code === '23505'){
            session(request.session, email)
            response.redirect('/login')
            }
          }) 
        })
      }
    }).catch(console.error)
})

router.get('/logout', (request, response) => {
  request.session.destroy(() => {
    response.redirect('/login')
  })
})

module.exports = router