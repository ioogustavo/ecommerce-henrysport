import React, { useState, useEffect } from "react";
import { Table } from 'semantic-ui-react'
import './Orden.css';
import { NavLink } from 'react-router-dom'
 

export default function Orden() {
    const [state, setState] = useState({
        ordenes: []
    });

    useEffect(() => {
        fetch(`http://localhost:3000/users/carts/pedidos`)
            .then(response => response.json())
            .then(json => {
                setState({
                    ...state,
                    ordenes: json
                })
            })
            .catch(error => {
                return error;
            })
    }, [])

    function handleChange(e) {
        setState({ estado: e.target.value });
    };

    return (
        <div className='divOrd'>
            <h1>Ordenes</h1>
            <Table celled selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Orden N°</Table.HeaderCell>
                        <Table.HeaderCell>Usuario</Table.HeaderCell>
                        <Table.HeaderCell>Total Compra</Table.HeaderCell>
                        <Table.HeaderCell>Cantidad Items</Table.HeaderCell>
                        <Table.HeaderCell>Estado</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        state.ordenes && state.ordenes.map(orden => {
                            let id = orden.id
                            return (
                                <Table.Row key="encontrado.id">
                                    <Table.Cell>
                                        <NavLink to={`/Admin/Ordenes/${id}`}> {orden.id} </NavLink> </Table.Cell>
                                    <Table.Cell>{orden.userId}</Table.Cell>
                                    <Table.Cell>{orden.price}</Table.Cell>
                                    <Table.Cell>{orden.cantidad}</Table.Cell>
                                    <Table.Cell>
                                        <form >
                                            <label>
                                                <select /* value={state.estado} onChange={handleChange} */>
                                                    <option value="Creada">Creada</option>
                                                    <option value="Procesando">Procesando</option>
                                                    <option value="Cancelada">Cancelada</option>
                                                    <option value="Completa">Completa</option>
                                                </select>
                                            </label>
                                        </form>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })
                    }
                </Table.Body>
            </Table >
        </div >

    )
}


