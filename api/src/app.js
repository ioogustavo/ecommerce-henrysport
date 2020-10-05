const express = require('express');
var cors = require('cors')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js')
var session = require('express-session');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
const { User, Carrito, Lineadeorden, Product } = require('./db.js');
var db = require('./db');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const exphbs = require('express-handlebars');

const server = express();
// server.use(cors())

server.engine('handlers', exphbs());








server.name = 'API';
server.use(cors({ origin: true, credentials: true }));
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(morgan('dev'));

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
})

server.use(cookieParser());
server.use(session({
  secret: 'secret',
  resave: false, //si no hubo cambios no volver a intentar guardar sesion
  saveUninitialized: false //si está vacia no guardarla
}))

passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  },
    (email, password, done) => {
      console.log('Ingreso primero a passport ', 'email', email, 'password', password);
      User.findOne({
        where: {
          email: email,
        }
      })
        .then(user => {
          if (!user) {
            return done(null, false, {
              message: 'Wrong email',
            })
          }
          bcrypt.compare(password, user.password).then(function (bool) {
            if (bool) {
              const token = jwt.sign({ email, password }, "Roberta2020");
              return done(null, user)
            } else {
              return done(null, false, {
                message: 'Incorrect password',
              })
            }
          })
        })
        .catch(err => {
          return done(err);
        })

    })
)

passport.serializeUser(function (user, done) {
  console.log("entro a serialize")
  console.log(user.dataValues.id)
  console.log(' termino serialize')
  done(null, user.dataValues.id)
})

passport.deserializeUser(function (id, done) {
  User.findByPk(id)
    .then((user) => {
      console.log("encuentro el usuario ")
      console.log(id)
      console.log(user.dataValues)
      console.log("termino de encontrar")
      done(null, user.dataValues);//user.get()
    })
    .catch(err => {
      return done(err)
    })
})

//inicializa passport y recupera el estado de autenticacion de la sesion
server.use(passport.initialize());
server.use(passport.session());

// server.use(express.static('public'));
server.use('/', routes);

//Middleware para mostrar la session actual en cada request
server.use((req, res, next) => {
  console.log("Middleware muestra sesion")
  console.log("req session")
  console.log(req.session)
  console.log("req user")
  console.log(req.user)
  next();
});

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;