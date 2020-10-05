import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { putProducts, deleteProducts } from '../../../actions/index.js';
import { Table } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import { storage } from '../../../firebase/firebase.js'

import './modificarProducto.css';

export function Modifica(props) {

    const [state, setState] = useState({
        id: "",
        name: "",
        description: "",
        price: "",
        stock: "",
        urlImage: "",
    });

    const [prodGuardados, setProdGuardados] = useState([])
    const [image, setImage] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/products')
            .then(response => response.json())
            .then(productos => {
                setProdGuardados({ productos })
            })
            .catch(error => {
                return error;
            })
    }, [])

    const actualizarEstado = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };


    const submitProducto = (e) => {
        actualizarEstado({
            id: "",
            name: "",
            description: "",
            price: "",
            stock: "",
            urlImage: "",
        });
    };

    function eliminar(id) {
        deleteProducts(id);
    }

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
                        console.log("url")
                        console.log(url)
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
            props.putProducts(state)
        }
    }




    return (
        <div className="container">
            <div className="buscadorProducto">
                <h3>Buscar producto a modificar</h3>
            </div>
            <Table celled selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Imagen</Table.HeaderCell>
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.HeaderCell>Nombre</Table.HeaderCell>
                        <Table.HeaderCell>Descripcion</Table.HeaderCell>
                        <Table.HeaderCell>Precio</Table.HeaderCell>
                        <Table.HeaderCell>Stock</Table.HeaderCell>
                        <Table.HeaderCell>Eliminar</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        prodGuardados.productos && prodGuardados.productos.map(encontrado => {
                            return (
                                <Table.Row key="encontrado.id">
                                    <Table.Cell> <img src={encontrado.urlImage} className="cimg-fluid" /></Table.Cell>
                                    <Table.Cell>{encontrado.id}</Table.Cell>
                                    <Table.Cell>{encontrado.name}</Table.Cell>
                                    <Table.Cell>{encontrado.description}</Table.Cell>
                                    <Table.Cell>${encontrado.price}</Table.Cell>
                                    <Table.Cell>{encontrado.stock}</Table.Cell>
                                    <Table.HeaderCell><Button negative
                                        onClick={() => eliminar(encontrado.id)}
                                    >Eliminar</Button>
                                    </Table.HeaderCell>
                                </Table.Row>
                            )
                        })
                    }
                </Table.Body>
            </Table>

            <div className="modificador">
                <h3>Ingrese los datos que desea modificar</h3>
                <form className="text-left"
                    onSubmit={(e) => {
                        e.preventDefault();
                        enviarDatos()
                    }}>

                    <div className="camposformulario">
                        <p className="title">Id: </p>
                        <input
                            type="text" name="id" className="form-control"
                            placeholder="Ingrese id del producto"
                            onChange={actualizarEstado} value={state.id}
                        />
                    </div>
                    <br /><br />

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
                            placeholder="Ingrese Precio"
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
                        Modificar producto
                    </button>
                </form>
            </div>
            <br /><br /><br />
        </div >
    );
}

function mapStateToProps(state) {
    return {
        productosModificado: state.putProductModify
    }
}

function mapDispatchToProps(dispatch) {
    return {
        putProducts: title => dispatch(putProducts(title)),
        deleteProducts: title => dispatch(deleteProducts(title))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Modifica)