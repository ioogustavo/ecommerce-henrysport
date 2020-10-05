import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { connect } from "react-redux";
import "./productCatalogo.css";
import { NavLink } from "react-router-dom";
import Carrito from "../Carrito/Carrito.js";
import { addProductsToCart } from "../../actions/index.js";
import SearchBar from "../Buscar/SearchBar.js";
import { add, list } from "cart-localstorage";
import { FaStar } from "react-icons/fa";

export default function AllProducts(props, all, asd) {
  if (props.props) {
    if (props.props.productos !== undefined) {
      // console.log(props.props.productos);
      var productosCargados = props.props.productos;
    } else if (props.props.products) {
      // console.log(props.props.products);
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

    <div id="allprods" className="bodycards">

      {productosCargados &&
        productosCargados.map((objeto) => {
          return (
            <div className="cardstyle" styles="width: 18rem;">
              <img src={objeto.urlImage} className="cimg-fluid" />
              <div className="card-body">
                <NavLink to={`/producto/${objeto.id}`}>
                  <h5 className="card-title">{objeto.name}</h5>
                </NavLink>

                <p className="card-text"> Descripción: {objeto.description} </p>

                <div className='item_list_rev_container'>
                  <div className='item_list_ranking'>
                    {[...Array(objeto.promedio)].map((star, i) => {
                      return (
                        <label>
                          <FaStar
                            className="star" 
                            color={"#ffc107"}
                            size={25}
                          />
                        </label>
                      );
                    })}
                  </div>

                </div>


                <h6 className="card-text"> Precio: ${objeto.price} </h6>
                <h6 className="card-text"> Stock: {objeto.stock} </h6>
                <div className="form-group mx-sm-3 mb-2">
                  <label htmlFor="inputCount" className="sr-only">
                    Cantidad
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputCount"
                    min="1"
                    max={objeto.stock}
                    placeholder="Cantidad: 1"
                    onChange={(e) => (objeto.count = e.target.value)}
                  />
                </div>
                <br />
                <br />
                {objeto.stock < 1 ? (
                  <div className="stock">No hay stock</div>
                ) : (
                    <button
                      className="botonAgregarCarrito"
                      onClick={(e) => {
                        agrego(objeto);
                      }}
                    >
                      Agregar a mi Carrito
                    </button>
                  )}
              </div>
            </div>
          );
        })}
    </div>
  );
}
