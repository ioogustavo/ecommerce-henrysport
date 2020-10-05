import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { connect } from "react-redux";
import { Table } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import './Carrito.css';
import { addProductsToCart, SendEmail } from '../../actions/index.js'
import { add, list, quantity, remove, update, total, destroy } from 'cart-localstorage'

export function Carrito(props) {


    const [state, setState] = useState({
        productos: []
    });

    const [usuario, setUsuario] = useState({
        id: [],
        name: [],
        email: []
    })

    let productosAgregadosCarrito = list();

    useEffect(() => {
        if (productosAgregadosCarrito) {
            setState({
                ...state,
                productos: productosAgregadosCarrito
            })
        }

        let usuario = localStorage.getItem('user')
        if (usuario) {
            let usuarioJSON = JSON.parse(usuario)
            let usuarioJSONid = usuarioJSON.id
            let usuarioJSONname = usuarioJSON.name
            let usuarioJSONemail = usuarioJSON.email
            setUsuario({
                id: usuarioJSONid,
                name: usuarioJSONname,
                email: usuarioJSONemail
            })
        }
    }, [])

    function cambiarCantidad(props, productoCompleto) {
        let count = props;
        let parsed = parseInt(count, 10)
        let idProd = productoCompleto.id;

        update(idProd, 'quantity', parsed)

        let actualizoCantidad = list()
        if (actualizoCantidad) {
            setState({
                ...state,
                productos: actualizoCantidad
            })
        }
    }

    function eliminar(props) {
        remove(props)
        let eliminoProductosCarrito = list()
        if (eliminoProductosCarrito) {
            setState({
                ...state,
                productos: eliminoProductosCarrito
            })
        }
    }

    function vaciar() {
        destroy();
        let vacioProductosCarrito = list()
        if (vacioProductosCarrito) {
            setState({
                ...state,
                productos: vacioProductosCarrito
            })
        }
    }

    function confirmarCompra() {
        if (usuario) {
            swal({
                text: "Gracias por su compra",
                icon: "success",
                timer: "2000",
            })
            localStorage.removeItem('__cart')
            vaciar()
            SendEmail(usuario)
            addProductsToCart(state.productos, usuario.id)
        } else {
            swal({
                text: "Debe iniciar sesión",
                icon: "warning",
                timer: "1500",
            });
        }
    }

    return (
        <div>
            <Table celled selectable>
                <Table.Header>
                    <Table.Row>
                        {/* <Table.HeaderCell>Imagen</Table.HeaderCell> */}
                        <Table.HeaderCell>Nombre</Table.HeaderCell>
                        <Table.HeaderCell>Precio</Table.HeaderCell>
                        <Table.HeaderCell>Cantidad</Table.HeaderCell>
                        <Table.HeaderCell>Eliminar</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        state.productos && state.productos.map(encontrado => {
                            return (
                                <Table.Row key="encontrado.id">
                                    {/* <Table.Cell> <img src={encontrado.urlImage} className="cimg-fluid" /></Table.Cell> */}
                                    <Table.Cell>{encontrado.name}</Table.Cell>
                                    <Table.Cell>${encontrado.price}</Table.Cell>
                                    <Table.Cell>
                                        <div class="form-group mx-sm-3 mb-2">
                                            <label for="inputCount" className="sr-only">Cantidad</label>
                                            <input type="number" min="1" className="form-control" pattern="^[1-9]+" id="inputCount" placeholder={encontrado.quantity} onChange={(e) => cambiarCantidad(e.target.value, encontrado)} />
                                        </div>
                                    </Table.Cell>
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
            <br />
            <div className="vaciarCarrito">
                <Button color='green' onClick={() => vaciar()}>Vaciar carrito</Button>
            </div>
            <br /><br />
             
            <div className="totalCarrito">
                <h5>Total</h5>
                <h5>${total()}</h5>
             
                {localStorage.user &&
                    < Button color='green' onClick={() => confirmarCompra()}>Confirmar compra</Button>
                }
            </div>
           
        </div >
        
    )
}

function mapStateToProps(state) {
    return {
        products: state.productsToCart
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addProductsToCart: props => dispatch(addProductsToCart()),
        SendEmail: title => dispatch(SendEmail(title))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Carrito)








// useEffect(() => {

//     const data = localStorage.getItem('listaProd')
//     const segundaData = localStorage.getItem('segundaListaProducto')
//     const tercerData = localStorage.getItem('tercerListaProducto')
//     if (data || segundaData || tercerData) {
//         setState({
//             ...state,
//             productos: JSON.parse(data),
//             segundoProductos: JSON.parse(segundaData),
//             tercerProductos: JSON.parse(tercerData)
//         })
//     }

//     // const segundaData = localStorage.getItem('segundaListaProducto')
//     // if (segundaData) {
//     //     setState({
//     //         ...state,
//     //         productos: JSON.parse(data)
//     //     })
//     // }

//     // const tercerData = localStorage.getItem('tercerListaProducto')
//     // if (tercerData) {
//     //     setState({
//     //         ...state,
//     //         productos: JSON.parse(data)
//     //     })
//     // }

// }, [])

// const sumo = () => {
//     let inicial = 0;
//     state.productos.map(encontrado => {
//         var precio = parseInt(encontrado.price, 10);
//         var cantidad = encontrado.count;
//         var valor = precio * cantidad;

//         inicial = inicial + valor
//     })
//     return inicial;
// }


// const borrar = (id) => {
//     for (let i = 0; i < state.productos.length; i++) {
//         if (state.productos[i].id === id) {
//             state.productos.splice(i, 1)
//         }
//     }
//     let cambio = state.productos
//     setState({
//         productos: cambio
//     })
// }

// useEffect(() => {
//     let lista = JSON.stringify(state.productos)
//     localStorage.setItem('listaProd', lista)
// })



{/* {
                        state.segundoProductos && state.segundoProductos.map(encontrado => {
                            return (
                                <Table.Row key="encontrado.id">
                                    <Table.Cell> <img src={encontrado.urlImage} className="cimg-fluid" /></Table.Cell>
                                    <Table.Cell>{encontrado.name}</Table.Cell>
                                    <Table.Cell>${encontrado.price}</Table.Cell>
                                    <Table.Cell>
                                        <div class="form-group mx-sm-3 mb-2">
                                            <label for="inputCount" className="sr-only">Cantidad</label>
                                            <input type="number" className="form-control" id="inputCount" placeholder={encontrado.count} onChange={(e) => encontrado.count = e.target.value} />
                                        </div>
                                    </Table.Cell>
                                    <Table.HeaderCell><Button negative onClick={() =>
                                        borrar(encontrado.id)}
                                    >Eliminar</Button>
                                    </Table.HeaderCell>
                                </Table.Row>
                            )
                        })
                    }
                    {
                        state.tercerProductos && state.tercerProductos.map(encontrado => {
                            return (
                                <Table.Row key="encontrado.id">
                                    <Table.Cell> <img src={encontrado.urlImage} className="cimg-fluid" /></Table.Cell>
                                    <Table.Cell>{encontrado.name}</Table.Cell>
                                    <Table.Cell>${encontrado.price}</Table.Cell>
                                    <Table.Cell>
                                        <div class="form-group mx-sm-3 mb-2">
                                            <label for="inputCount" className="sr-only">Cantidad</label>
                                            <input type="number" className="form-control" id="inputCount" placeholder={encontrado.count} onChange={(e) => encontrado.count = e.target.value} />
                                        </div>
                                    </Table.Cell>
                                    <Table.HeaderCell><Button negative onClick={() =>
                                        borrar(encontrado.id)}
                                    >Eliminar</Button>
                                    </Table.HeaderCell>
                                </Table.Row>
                            )
                        })
                    } */}