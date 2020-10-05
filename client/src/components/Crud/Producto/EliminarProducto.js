import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { deleteProducts } from '../../actions/index.js'


export function EliminarProducto(props) {

    const [eliminarProd, setEliminarProducto] = useState([]);

    return (
        <div>
        <form onSubmit={(e) => {
            e.preventDefault();
            setEliminarProducto("");
            props.deleteProducts(eliminarProd);
        }}>
            <div className="eliminar">
                <p className="title">Id del producto: </p>
                <input
                    type="text" name="nombre" className="form-control"
                    placeholder="Ingrese id del producto a eliminar"
                    value={eliminarProd}
                    onChange={e => setEliminarProducto(e.target.value)}
                />

                <br /><br /><br />
                <button type="submit" className="btn btn-primary">
                    Eliminar producto
                </button>
            </div>
        </form>
     
        </div>
    )
}

function mapStateToProps(state) {
    return {
        productosEliminar: state.productDeleted
    }
}
function mapDispatchToProps(dispatch) {
    return {
        deleteProducts: title => dispatch(deleteProducts(title))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EliminarProducto)