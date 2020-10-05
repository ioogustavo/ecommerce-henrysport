const server = require('express').Router();
const { User, Carrito, Lineadeorden, Product, Domicilio } = require('../db.js');
const cors = require("cors");
// const { default: Login } = require('../../../client/src/usuario/Login.js');
// var passport = require('passport')
// var LocalStrategy = require('passport-local').Strategy;
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');



server.use(cors());

//
server.put('/:id/domicilio', (req, res, next) => {
  var userAdress = req.body.adress;
var setAdress = {
  name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    adress: userAdress,
    mobilephone: req.body.mobilephone,
    rol: req.body.rol
}
  User.findOne({
    where: {
      id: req.params.id
    }
  }).then(usuarioEncontrado => {
    usuarioEncontrado.update(setAdress)
      .then(newUser => {
        newUser.save()
        res.status(200)
        return res.json(newUser);
      })
  }).catch(next)
})

//


// function generateToken(req, res, next) {
//   var u = {
//    email: req.params.email,
//    id: req.params.id
//   }
//   return token = jwt.sign(u, 'password', {
//      expiresIn: 60 * 60 * 24 // expires in 24 hours
//   })
// }

// server.use('/secure',function(req, res, next) {
//   var token = req.headers['authorization']
//   if (!token) {
//     res.status(401).send({
//       ok: false,
//       message: 'Token inválido'
//     })
//   }

//   token = token.replace('Bearer ', '')

//   jwt.verify(token, 'password', function(err, token) {
//     if (err) {
//       return res.status(401).send({
//         ok: false,
//         message: 'Token inválido'
//       });
//     } else {
//       req.token = token
//       next()
//     }
//   });
// });


//trae todos los usuarios--------------
server.get('/', (req, res, next) => {

  User.findAll()
    .then(users => {
      res.send(users);
    })
    .catch(next);
});

//crea usuarios-------------------
server.post('/', (req, res, next) => {

  User.create({
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    adress: req.body.adress,
    mobilephone: req.body.mobilephone,
    rol: req.body.rol
  }).then((usuario) => {
    return res.json(usuario);
  })
    .catch(next);
});

//actualizar usuario--------------------
server.put('/:id', (req, res, next) => {

  var userUp = {
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    adress: req.body.adress,
    mobilephone: req.body.mobilephone,
    rol: req.body.rol
  }

  User.findOne({
    where: {
      id: req.params.id
    }
  }).then(usuarioEncontrado => {
    usuarioEncontrado.update(userUp)
      .then(newUser => {
        newUser.save()
        res.status(200)
        return res.json(newUser);
      })
  }).catch(next)


});

//reset password

//intento de corroboracion fallido
// server.get('/:id/passVerify', (req, res, next) => {
//   var oldpassword = req.body.password;
// User.findOne({
//     where: {
//       id: req.params.id
//     }
//   }).then(verify => {
//     if(bcrypt.compare(oldpassword, user.password)) {
//       res.send("la contraseña es correcta")
//     } else {
//       res.json("la contraseña no coincide")
//     }
//   }).catch("error");
// })

// const isValidPassword = function(user, password){
//   var result = bcrypt.compareSync(password, user.password);
//   if (result) {
//    console.log("Password correct");
//   } else {
//   console.log("Password wrong");
//   }
//   return result;

// }


server.put("/:id/passwordReset", function (req, res, next) {
  var oldpassword = req.body.password;
  var newpassword = req.body.new_password;
  var hash = bcrypt.hashSync(newpassword, bcrypt.genSaltSync(8));
	var userUp = {
		name: req.body.name,
		lastName: req.body.lastName,
		email: req.body.email,
    password: hash,
    adress: req.body.adress,
		mobilephone: req.body.mobilephone,
		rol: req.body.rol
	 }
   
	 User.findOne({
	where: {
    id: req.params.id
		}
   }).then(usuarioEncontrado => {
    usuarioEncontrado.update(userUp)
      .then(newUser => {
        newUser.save()
        res.status(200)
        return res.json(newUser);
      })
  }).catch(next)
})


//---------------------
//verifica si ya existe un usuario con ese email

server.get('/:email', (req, res, next) => {

  var verify = User.findAll({
    where: {
      email: req.params.email
    }
  }).then(verify => {
    if (verify.length === 0) {
      res.json("el email esta disponible")
    } else {
      res.json("ya existe un usuario con este email")
    }
  }).catch("error");


})

//------------------------
//elimina usuario

server.delete('/:id', (req, res, next) => {
  User.destroy({
      where: {
          id: req.params.id
      }
  }).then(() => {
		res.status(200)
		res.send("usuario eliminado")
	}).catch("error");
})

//----------------

//POST /users/:idUser/cart
// agregar Item al Carrito
server.post("/:id/cart", (req, res, next) => {
  let total = req.body.completo
  let cantidad = req.body.cantidad
  let arrayProductos = req.body.payload


  Carrito.create({
    price: total,
    cantidad: cantidad,
    userId: req.params.id,
    estado: 'creada'
  }).then(function (cart) {
    return arrayProductos.map(ldo => {
      Lineadeorden.create({
        cantidad: ldo.quantity,
        price: ldo.price,
        carritoId: cart.dataValues.id,
        productId: ldo.id
      })
      var cantidad = ldo.quantity;
      Product.findOne({
        where: {
          id: ldo.id
        }
      }).then(prodEncontrado => {
        var stock = prodEncontrado.stock;
        var descuento = stock - cantidad;
        prodEncontrado.update({
          stock: descuento
        })
      })
    })
  })
})


//GET /users/:idUser/cart
//Trae todas las ordenes de un usuario
server.get("/:id/cart", (req, res, next) => {
  Carrito.findAll({
    where: {
      userId: req.params.id
    }
  })
    .then(products => {
      res.send(products);
    })
    .catch(next);
});

//Trae todas las ordenes de todos los usuarios
server.get("/carts/pedidos", (req, res, next) => {
  Carrito.findAll()
    .then(carts => {
      res.send(carts);
    })
    .catch(next);
});

//Trae todas las lineas de ordenes de un carrito
server.get("/carts/:id", (req, res, next) => {
  Lineadeorden.findAll({
    where: {
      carritoId: req.params.id
    }
  })
    .then(ldos => {
      res.send(ldos);
    })
    .catch(next);
});

//DELETE /users/:idUser/cart/
server.delete("/:idUser/cart/", (req, res, next) => {
  Carrito.findAll({
    include: {
      model: Lineadeorden,
      where: {
        carritoId: 1
      }
    }
  })
    .then(products => {
      var ldos = products[0].dataValues.Lineadeordens
      let ldosId = [];
      let prodId;
      for (var i = 0; i < ldos.length; i++) {
        prodId = ldos[i].dataValues.productId
        prod = ldos[i].dataValues;
        if (prodId == req.body.productId) {
          ldosId.push(prod);
        }
      }
      return ldosId;
    }).then((prodElim) => {
      let eliminado = prodElim[0];
      Lineadeorden.destroy({
        where: {
          productId: eliminado.productId
        }
      }).then(() => {
        res.status(200).send('Producto Eliminado')
      })
    })
    .catch(next);
});


//PUT /users/:idUser/cart
server.put("/:id", (req, res, next) => {
  let id = req.params.id;
  let nuevosDatos = req.body;
  Carrito.findOne({
    where: {
      id: id,
    }
  }).then(cart => {
    cart.update(nuevosDatos).then((newCart) => {
      res.json(newCart);
    });
  });
});

//--------------------------
//para abajo rutas de login.




module.exports = server;