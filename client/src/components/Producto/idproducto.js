import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import "./idproducto.css";
import HalfRating from "./starRating";
import AllReviews from "./allReviews.js"
import { add } from 'cart-localstorage'

/* import productos from '../Catalogo/Productos'; */

const Idproducto = () => {
  const [detalles, setDetalles] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    count: 0,
    urlImage: ""
  })
  const [usuarioCargado, setUsuarioCargado] = useState({
    id: []
  })


  var url = window.location.href;
  //Esta variable separa la url conn "/", para luego tomar el ultimo valor 
  var separarUrl = url.split("/");
  //Esta variable toma el ultimo valor de la URL, para hacerla dinamica
  var tomarUltValor = separarUrl.pop();
  //URL dinamica
  var urlreal = `http://localhost:3000/products/producto/${tomarUltValor}`;

  useEffect(() => {
    fetch(`http://localhost:3000/products/producto/${tomarUltValor}`)
      .then((response) => response.json())

      .then(producto => {

        setDetalles({
          id: producto[0].id,
          name: producto[0].name,
          description: producto[0].description,
          price: producto[0].price,
          stock: producto[0].stock,
          urlImage: producto[0].urlImage,
          count: 0
        })
      })
      .catch(error => {
        return error;
      })


  }, []);

  useEffect(() => {

    let usuario = localStorage.getItem('user')
    if (usuario) {
      let usuarioJSON = JSON.parse(usuario)
      let usuarioJSONid = usuarioJSON.id
      setUsuarioCargado({
        id: usuarioJSONid
      })
    }
  }, [])

  function mostrarAddReview() {
    if (usuarioCargado.id !== undefined) {
      return (
        <HalfRating />
      )
    }
  }

 function agrego(objeto) {
   let stock = objeto.stock - objeto.count;
   if (stock < 0) {
     return swal({
       text: "La cantidad ingresada supera el stock disponible",
       icon: "warning",
       timer: "2500",
     });
   } else {
     let id = objeto.id;
     let name = objeto.name;
     let price = objeto.price;
     let count = objeto.count;
     let parsed = parseInt(count, 10);

     add({ id: id, name: name, price: price }, parsed);
     return swal({
       text: objeto.name,
       icon: "success",
       timer: "1500",
     });
   }
 }
  return (
    <div>
      <div className="container">
        <div className="card-container">
          <div className="header">
            <img className="imagen" src={detalles.urlImage} alt=" ImagenProducto" />
          </div>
          <div className="descripcion">
            <h2><strong>{detalles.name}</strong></h2>
            <p>{detalles.description} </p>
            <p>Precio: ${detalles.price} </p>
            <p>Stock: {detalles.stock} </p>
            <div class="form-group mx-sm-3 mb-2">
              <label for="inputCount" className="sr-only">
                Cantidad
          </label>
              <input
                type="number"
                className="form-control"
                id="inputCount" min="1" max={detalles.stock}
                placeholder="Cantidad: 1"
                onChange={(e) => setDetalles({
                  ...detalles,
                  count: e.target.value
                })
                }
              />
              <button className="botonAgregarCarrito"
                onClick={() => {
                  agrego(detalles) }}>Agregar a mi Carrito</button>
              <div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {localStorage.user && <HalfRating />}
      </div>
      <div>
        <AllReviews />
      </div>

    </div>
  );
};
export default Idproducto;
