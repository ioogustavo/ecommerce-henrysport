import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { addCategory } from '../../../actions/index.js'
import { NavLink } from 'react-router-dom'
import SearchCategoria from './SearchCategoria';
import ModificarCategoria from './ModificarCategoria';


export function Categoria(props) {
    const [state, setState] = useState({
        name: "",
        description: "",
    });

    const actualizarEstado = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const submitProducto = (e) => {
        actualizarEstado({
            name: "",
            description: ""
        });
    };

    return (
        <div className="container">
            <div className="col-xs-1">
                <h2>Agregar Categoria</h2>
                <form className="text-left form-group"
                    onSubmit={(e) => {
                        e.preventDefault()
                        props.addCategory(state)
                    }}
                >
                    <div className="camposformulario">
                        <p className="title">Nombre: </p>
                        <input
                            type="text" name="name" className="form-control"
                            placeholder="Ingrese nombre de la categoria"
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

                    <button onSubmit={submitProducto} type="submit" className="btn btn-primary">
                        Cargar producto
                    </button>
                </form>
            </div>

            <div className="Producto Guardado">
                {props.categGuardada &&
                    < div >
                        <li>
                            <NavLink to={`/producto/${props.categGuardada.id}`}>
                                <h5>Nombre: {props.categGuardada.name}</h5>
                                <h5>Descripcion: {props.categGuardada.description}</h5>
                            </NavLink>
                        </li>
                    </div>
                }
            </div>

            {/* MODIFICAR CATEGORIA */}
            <SearchCategoria />
            
            <ModificarCategoria />


        </div >
    );
};

function mapStateToProps(state) {
    return {
        categGuardada: state.categoryCreated,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        addCategory: title => dispatch(addCategory(title)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Categoria)
