const server = require('express').Router();
const { Lineadeorden, Carrito, User } = require('../db.js');
const cors = require("cors");
const { Op } = require("sequelize");

server.use(cors()); 
//todas las direcciones comienzan con: '/orders'

server.post('/', (req, res, next) => {
    Carrito.create({
		userId: req.body.userId,
		price: req.body.price,
        estado:"carrito"
	})
	.then(created=> {
		res.status(200).send(created)
	})
    .catch(next);
    })

//muestro todas las ordenes
server.get('/', (req, res, next) => {
	//deberia ir carrito
	Carrito.findAll()
	.then(order => {
		res.send(order);
	})
	.catch(error => {
		console.log(error)
		res.sendStatus(400)
	})
});

//obtengo las ordenes de un usuario
server.get('/usuario/:id/orden', (req, res) =>{
	Carrito.findAll({
        where: {userId: req.params.id}
    })
        .then(order => {
            res.send(order);
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(400)
        })
});


//obtengo una orden con su id
server.get('/:id',(req, res, next)=>{
	Carrito.findByPk(
        req.params.id, 
        {include: Lineadeorden}
    )
        .then(order => {
            res.send(order);
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(400)
        })
});


server.put('/:id', (req, res, next) => {
	
	Carrito.findByPk(req.params.id)
	.then((order)=>{
        order.estado = req.body.status; 
        return order.save();
    })
    .then((order)=> res.status(200).send(order))
    .catch(err => {
        console.log(err)
        res.sendStatus(400)
    })
});

module.exports = server;