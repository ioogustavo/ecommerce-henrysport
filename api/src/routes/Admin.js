const {User} = require('../db.js')
const server = require('express').Router();
const cors = require("cors");
const Sequelize = require('sequelize');

server.use(cors()); 

server.put('/promote/:id', (req, res, next) => {
	var admin = "admin";
	var userUp = {
		name: req.body.name,
		lastName: req.body.lastName,
		email: req.body.email,
		password: req.body.password,
		mobilephone: req.body.mobilephone,
		rol: admin
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

server.get('/search/:id',(req, res, next)=>{
	User.findAll({
		where: {
			name: {
				[Sequelize.Op.iLike]: `%${req.params.id}%`
			}
		},
		where: {
			lastName: {
				[Sequelize.Op.iLike]: `%${req.params.id}%`
			}
		},
		where: {
			email: {
				[Sequelize.Op.iLike]: `%${req.params.id}%`
			}
		}
	})
	.then(usuarioEncontrado => {
		res.json(usuarioEncontrado);
	})
	.catch(next)
})







module.exports=server;