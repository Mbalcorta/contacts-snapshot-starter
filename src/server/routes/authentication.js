const router = require('express').Router()

router.get('/signup', (request, response) => {
  response.render('signup')
})

router.get('/login', (request, response) => {
  response.render('login')
})

module.exports = router