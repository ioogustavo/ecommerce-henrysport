import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import "./productCatalogo.css";
import { NavLink } from "react-router-dom";
import SearchBar from "../Buscar/SearchBar.js";
import { add, list } from "cart-localstorage";

function mostrar() {
  var mos = document.getElementById("Descripcion");
  mos.style.display = "block";
}

function ocultar() {
  var ocu = document.getElementById("Descripcion");
  ocu.style.display = "none";
}

const ProductCatalogo = (props) => {
  const [tercerListaProducto, setTercerListaProducto] = useState([]);

  if (props.props) {
    if (props.props.productos !== undefined) {
      var productosCargados = props.props.productos;
    } else if (props.props.products) {
      var productosCat = props.props.products;
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
    <div id="catprods" className="bodycards">
      {productosCat &&
        productosCat.map((props) => {
          return (
            <div className="cardstyle" styles="width: 18rem;">
              <img src={props.urlImage} className="cimg-fluid" />
              <div className="card-body">
                <NavLink to={`/producto/${props.id}`}>
                  <h5 className="card-title">{props.name}</h5>
                </NavLink>

                <p className="card-text"> Descripción: {props.description} </p>
                <h6 className="card-text"> Precio: ${props.price} </h6>
                <h6 className="card-text"> Stock: {props.stock} </h6>
                <div class="form-group mx-sm-3 mb-2">
                  <label for="inputCount" className="sr-only">
                    Cantidad
                  </label>
                  <input
                    type="number"
                    min="1" max={props.stock}
                    className="form-control"
                    id="inputCount"
                    placeholder="Cantidad: 1"
                    onChange={(e) => (props.count = e.target.value)}
                  />
                </div>
                <button
                  className="botonAgregarCarrito"
                  onClick={(e) => {
                    agrego(props);
                  }}
                >
                  {" "}
                  Agregar a mi Carrito
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ProductCatalogo;
