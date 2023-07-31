const express = require('express')
const bodyParser = require('body-parser')
const router = require('./routes/router')
const path = require('path')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const methodOverride = require('method-override');
const bcrypt = require('bcrypt')
const PORT = 3000
const unDia = 1000 * 60 * 60 * 24
const app = express()

app.use(methodOverride());
app.use(cookieParser())
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({extended :false}))
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(session({
  key: 'login-session',
  secret: '123456',
  saveUninitialized: false,
  cookie: { maxAge: unDia},
  resave: true,
}))

router.routes(app);

app.use((req, res, next) => {
  res.status(404).render('error', {
    title: 'Página no encontrada',
    subtitle: 'Página no encontrada',
    errorNumber: '404'
  });
});

app.listen(PORT, () => {console.log('listening on port 3000')})