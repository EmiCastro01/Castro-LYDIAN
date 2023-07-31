const express = require('express')
const bodyParser = require('body-parser')
const router = require('./routes/router.js')
const path = require('path')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bcrypt = require('bcrypt')
const app = express()
const PORT = 3000
const unDia = 1000 * 60 * 60 * 24

app.use(session({
  key: 'login-session',
  secret: '123456',
  saveUninitialized: false,
  cookie: { maxAge: unDia},
  resave: true,
}))
app.use(cookieParser())
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({extended :false}))
app.use(express.static(__dirname + '/public'));
app.listen(PORT, () => {console.log('listening on port 3000')})
app.set('view engine', 'ejs');


router.routes(app);