require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const methodOverride = require('method-override')
const routes = require('./server/routes');
const middlewares = require('./server/middlewares');
const path = require('path');
const session = require('express-session')
const db = require('./models/db/db.js')
const pgSession = require('connect-pg-simple')(session);

app.set('views', __dirname +  '/views')
app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

                     
app.use(session({
    store: new pgSession({ pgPromise: db }),
    secret: 'jW8aor76jpPX', // session secret
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days 
  }));

app.use(methodOverride('_method'))

app.use(middlewares.addUserToRequest)

app.use(middlewares.setDefaultResponseLocals)

app.use('/', routes)

app.use((request, response) => {
  response.render('common/not_found', {signup: false})
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
