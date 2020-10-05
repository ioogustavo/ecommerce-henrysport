import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { putCategory, deleteCategory } from '../../../actions/index.js';
import { Table } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'

// import './modificarProducto.css';

export function ModificarCategoria(props) {

    const [state, setState] = useState({
        id: "",
        nombre: "",
        descripcion: ""
    });

    const [prodCategorias, setCategorias] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/products/category')
            .then(response => response.json())
            .then(categorias => {
                setCategorias({ categorias })
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
            nombre: "",
            descripcion: ""
        });
    };

    function eliminar(id) {
        deleteCategory(id);
    }

    return (
        <div className="container">
            <div className="buscadorProducto">
                <h3>Buscar producto a modificar</h3>
            </div>
            <Table celled selectable>
                <Table.Header>
                    <Table.Row>

                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.HeaderCell>Nombre</Table.HeaderCell>
                        <Table.HeaderCell>Descripcion</Table.HeaderCell>
                        <Table.HeaderCell>Eliminar</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        prodCategorias.categorias && prodCategorias.categorias.map(encontrado => {
                            return (
                                <Table.Row key="encontrado.id">
                                    <Table.Cell>{encontrado.id}</Table.Cell>
                                    <Table.Cell>{encontrado.name}</Table.Cell>
                                    <Table.Cell>{encontrado.description}</Table.Cell>
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

                    
                <div><h2>Ingrese datos a modificar</h2></div>
            <div className="container">
                <form className="text-left"
                    onSubmit={(e) => {
                        e.preventDefault();
                        props.putCategory(state)
                    }}>

                    <div className="camposformulario">
                        <p className="title">Id: </p>
                        <input
                            type="text" name="id" className="form-control"
                            placeholder="Ingrese id de la categoria"
                            onChange={actualizarEstado} value={state.id}
                        />
                    </div>
                    <br /><br />

                    <div className="camposformulario">
                        <p className="title">Nombre: </p>
                        <input
                            type="text" name="nombre" className="form-control"
                            placeholder="Ingrese nombre del producto"
                            onChange={actualizarEstado} value={state.nombre}
                        />
                    </div>
                    <br /><br />

                    <div className="camposformulario">
                        <p className="title">Descripción: </p>
                        <input
                            type="text" name="descripcion" className="form-control"
                            placeholder="Ingrese una descripción"
                            onChange={actualizarEstado} value={state.descripcion}
                        />
                    </div>
                    <br /><br />


                    <button onSubmit={submitProducto} type="submit" className="btn btn-primary">
                        Modificar categoria
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
        putCategory: title => dispatch(putCategory(title)),
        deleteCategory: title => dispatch(deleteCategory(title))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModificarCategoria)