const server = require('express').Router();
const cors = require("cors");
const { User, Carrito, Lineadeorden, Product } = require('../db.js');
const session = require("express-session");
const passport = require('passport');
const jwt = require("jsonwebtoken");
// const { isAuthenticated } = require('./validations.js')

server.use(cors());

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log("estoy autenticando")
    console.log(req)

    next();
  } else {
    res.status(404);
    res.send('No se logró autentificar');
  }
}

function isValidToken(req, res, next) {
  isAuthenticated;

  if (req.user.rol === "admin") {
    next()
  } else {
    res.status(401).send({
      error: "Es necesario el token de autenticación o no sos admin",
    });
    return;
  }

}


function isAdmin(req, res, next) {
  if (req.user.rol === 'admin') {
    next();
  }
}

server.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), function (req, res,) {
  res.send(req.user)
});

server.get('/', (req, res) => {
  console.log('chau');
});

//lo pruebo sin redirect

server.get('/logout', (req, res) => {
  req.logout();
  res.send('logout');
});

server.get('/login', cors(), async (req, res, next) => {
  console.log(req.user);
  res.send(req.user);
})

server.get('/profile',
  isAuthenticated,
  cors(),
  function (req, res) {
    console.log("ESTO ES EL PERFIL PIBE")
    console.log(req.user)
    return res.send(req.user)
  })

server.get('/admin',
  isValidToken,
  cors(),
  function (req, res) {
    return res.send("Sos admin")
  })

server.post('/promote/:id', isAdmin, (req, res) => {
  console.log(req.params.id);
  User.findByPk(req.params.id)
    .then(user => {
      user.update({ admin: true }), user.save();
      res.send(user);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});









module.exports = server;