const server = require('express').Router();
const cors = require("cors");
const { User, Product, Review } = require('../db.js');
const Sequelize = require('sequelize');

server.use(cors());


//Crear Ruta para obtener todas las reviews de un producto.
//GET /product/:id/review/
server.get("/:id/review", (req, res) => {
  Review.findAll({
    where: {
      productId: req.params.id,
    },
    include: [
      {
        model: User,
      },
    ],
  })
    .then((reviews) => {
      res.status(200).json(reviews);
    })
    .catch(function (err) {
      res
        .status(404)
        .json({ message: "No se obtuvieron las reviews", data: err });
    });
});


//Crear ruta para crear/agregar Review
//POST /product/:id/review
server.post("/:id/review", (req, res) => {
  console.log(req.params)
  console.log(req.body)
  let description = req.body.description;
  let star = req.body.star;
  let productId = req.params.id;
  let userId = req.body.userId.id;
  Review.create({
    description: description,
    star: star,
    userId: userId,
    productId: productId,
  })
    .then((review) => {
      console.log(review);
      res.status(200).json({ review, message: "Se guardó la review" });
    })
    .catch(function (err) {
      res
        .status(404)
        .json({ message: "No se pudo crear la review", data: err });
    });
});

//Crear ruta para Modificar Review
//PUT /product/:id/review/:idReview
server.put("/:id/review", (req, res) => {
  let id = req.params.id;
  console.log(req.body)
  Review.update(req.body, {
    where: {
      id: id,
    },
    returning: true,
  })
    .then((response) => {
      let review = response[1][0];
      return review;
    })
    .then(function (review) {
      res.status(200).json({ review, message: "Se actualizó la review" });
    })
    .catch(function (err) {
      res.status(404).json({ message: "No se pudo actualizar la review", data: err });
    });
});

//DELETE /product/:id/review/:idReview
server.delete("/:id/review", (req, res) => {
  let id = req.params.id;
  Review.destroy({
    where: {
      id: id,
    },
  })
    .then((review) => {
      res.status(200).json({ message: "Se eliminó la review" });
    })
    .catch(function (err) {
      res.status(404).json({ message: "No se pudo eliminar la review", data: err });
    });
});

module.exports = server;
