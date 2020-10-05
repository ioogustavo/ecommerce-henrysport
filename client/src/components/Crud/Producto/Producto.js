import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addProducts } from '../../../actions/index.js'
import { storage } from '../../../firebase/firebase.js'
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom'
import { Dropdown } from 'semantic-ui-react'

import SearchProducto from './SearchProducto'
import ModificarProducto from './ModificarProducto.js'
import './Producto.css'

export function Producto(props) {
    const [state, setState] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        urlImage: "",
        listaCategoria: [],
        categoriasElegidas: []
    });

    const [image, setImage] = useState(null);

    const actualizarEstado = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const submitProducto = (e) => {
        actualizarEstado({
            name: "",
            description: "",
            price: "",
            stock: "",
            urlImage: "",
        });
    };

    useEffect(() => {
        fetch(`http://localhost:3000/products/category`)
            .then(response => response.json())
            .then(json => {
                setState({
                    ...state,
                    listaCategoria: json
                })
            })
            .catch(error => {
                return error;
            });
    }, []);

    //1.1 - Primer array vacio que rellenara la siguiente funcion
    var options = [];

    //1.2 - Esta funcion la llama el body despues que se cargue useEffect y rellene el atributo listaCategoria del estado
    const listandoCategorias = () => {
        if (state.listaCategoria) {
            state.listaCategoria.map((productoEncontrado) => {
                return (
                    options.push({
                        key: productoEncontrado.name,
                        text: productoEncontrado.name,
                        value: productoEncontrado.name
                    })
                )
            })
        }
    }


    const handleChange = (e, { value }) => setState({
        ...state,
        categoriasElegidas: value
    })



    const handleChangeImage = (e) => {
        if (e.target.value[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => { },
            error => {
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        setState({
                            ...state,
                            urlImage: url
                        })
                    })
            }
        )
    }

    const enviarDatos = () => {
        if (state.urlImage !== '') {
            props.addProducts(state)
        }
    }

    return (
        <div className="container">
            {/* CARGAR PRODUCTOS */}
            <div className="container">
                <div className="col-xs-6">
                    <div className="column">
                        <form className="text-left form-group"
                            onSubmit={(e) => {
                                e.preventDefault()
                                enviarDatos()
                            }}
                        >
                            <div className="camposformulario">
                                <p className="title">Nombre: </p>
                                <input
                                    type="text" name="name" className="form-control"
                                    placeholder="Ingrese nombre del producto"
                                    onChange={actualizarEstado} value={state.name}
                                />
                            </div>
                            <br /><br />

                            <div className="camposformulario">
                                <p className="title">Descripción: </p>
                                <input
                                    type="text" name="description" className="form-control"
                                    placeholder="Ingrese una descripción"
                                    onChange={actualizarEstado} value={state.description}
                                />
                            </div>
                            <br /><br />

                            <div className="camposformulario">
                                <p className="title">Precio: </p>
                                <input
                                    type="number" name="price" className="form-control"
                                    placeholder="Ingrese precio"
                                    onChange={actualizarEstado} value={state.price}
                                />
                            </div>

                            <br /><br />

                            <div className="camposformulario">
                                <p className="title">Cantidad: </p>
                                <input
                                    type="number" name="stock" className="form-control"
                                    placeholder="Ingrese cantidad"
                                    onChange={actualizarEstado} value={state.stock}
                                />
                            </div>
                            <br /><br />

                            <div className="camposformulario">
                                {/*1.3 - Si existe listaCategoria del estado va a activar la funcion listandoCategorias() */}
                                {state.listaCategoria && listandoCategorias()}
                                {/*1.4 - Una vez cargado el array `options` esta libreria lo renderiza señalandolo en las caracteristicas del Tag */}
                                <Dropdown placeholder='Categorias' fluid multiple selection options={options} onChange={handleChange} />
                            </div>
                            <br /><br />

                            <div className="custom-file">
                                <input
                                    type="file" class="custom-file-input" id="customFileLang" lang="es"
                                    onChange={e => setImage(e.target.files[0])}
                                /> <br /><br />
                                <label class="custom-file-label" for="customFileLang" lang="es">Seleccionar Archivo</label>
                                <button className="btn btn-primary" onClick={handleUpload}>GuardarImagen</button>
                            </div>
                            <br /><br /><br />
                            <button onSubmit={submitProducto} type="submit" className="btn btn-primary">
                                Cargar producto
                            </button>
                        </form>
                    </div>
                </div>

                <div className="col-xs-6">

                    {props.productoGuardado &&
                        < div className="column mostrarProductoGuardado">
                            <li>
                                <NavLink to={`/producto/${props.productoGuardado.id}`}>
                                    <h5>Nombre: {props.productoGuardado.name}</h5>
                                    <h5>Descripcion: {props.productoGuardado.description}</h5>
                                    <h5>Precio: {props.productoGuardado.price}</h5>
                                    <h5>Cantidad: {props.productoGuardado.stock}</h5>
                                    <h5>Imagen</h5>
                                    <img src={props.productoGuardado.urlImage}></img>
                                </NavLink>
                            </li>
                        </div>
                    }
                </div>
            </div>

            {/* MODIFICAR PRODUCTO */}

            <SearchProducto />
            <ModificarProducto />


            <div>
                <Link class="nav-link" to="/Admin">go back to administrator settings</Link>
            </div>

        </div >
    );
};

function mapStateToProps(state) {
    return {
        productoGuardado: state.products,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        addProducts: title => dispatch(addProducts(title)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Producto)
