import React, { useState, useEffect } from 'react';
import swal from "sweetalert";
import "./searchBar.css"
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom'
import { getProducts } from '../../actions/index.js'
import '../Catalogo/productCatalogo.css';
import { add, list } from 'cart-localstorage'


export function SearchBar(props) {

  const [product, setProduct] = useState([])

  function ocultar() {
    var ocu = document.getElementById('allprods');
    ocu.style.display = "none"
    var cats = document.getElementById('catprods');
    cats.style.display = "none"
  }

  function mostrar() {
    var look = document.getElementById('cardslook');
    look.style.display = "flex"
  }

 function agrego(objeto) {
   let stock = objeto.stock - objeto.count;
   if (stock < 0) {
     return swal({
       text: "La cantidad ingresada es mayor al stock",
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

    <div className="contenedorSB">

      <div className="buscador">
        <form onSubmit={(e) => {
          e.preventDefault();
          setProduct("");
          props.getProducts(product);
          ocultar();
          mostrar();
        }}>
          <input
            placeholder="Busca un producto"
            type="search"
            value={product}
            onChange={e => setProduct(e.target.value)}
          />
          <button className="button" type="submit" >
            <i className="material-icons"> search</i>
          </button>
        </form>
      </div>
      <br /><br /><br />
      <div>
        <div id="cardslook" className='bodycards'>
          {props.products && props.products.map((productoEncontrado, id) => {

            return (
              <div className="cardstyle" styles="width: 18rem;" >
                <img src={productoEncontrado.urlImage} className="cimg-fluid" />
                <div className="card-body">
                  <NavLink to={`/producto/${productoEncontrado.id}`}>
                    <h5 className="card-title">{productoEncontrado.name}</h5>
                  </NavLink>

                  <p className="card-text"> Descripción: {productoEncontrado.description} </p>
                  <h6 className="card-text"> Precio: ${productoEncontrado.price} </h6>
                  <h6 className="card-text"> Stock: {productoEncontrado.stock} </h6>
                  <div class="form-group mx-sm-3 mb-2">
                    <label for="inputCount" className="sr-only">Cantidad</label>
                    <input type="number" min="1" max={productoEncontrado.stock} className="form-control" id="inputCount" placeholder="Cantidad: 1" onChange={(e) => productoEncontrado.count = e.target.value} />
                  </div>
                  <button className="botonAgregarCarrito" onClick={e => {
                    agrego(productoEncontrado)}}
                  > Agregar a mi Carrito
                  </button>

                </div>
              </div>
            )
          })}

        </div>
      </div>
    </div >
  );
}

function mapStateToProps(state) {
  return {
    products: state.productsLoaded
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getProducts: title => dispatch(getProducts(title))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar)