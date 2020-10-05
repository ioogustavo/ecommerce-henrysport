import React, { useEffect, useState } from "react";
import './Orden.css';
import { Table } from 'semantic-ui-react'


export default function OrdenDetailUser() {

    const [state, setState] = useState({
        lineaOrden: []
    });

    useEffect(() => {

        //URL dinamica
        var url = window.location.href;
        //Esta variable separa la url conn "/", para luego tomar el ultimo valor 
        var separarUrl = url.split("/");
        //Esta variable toma el ultimo valor de la URL, para hacerla dinamica
        var id = separarUrl.pop();

        fetch(`http://localhost:3000/users/carts/${id}`)
            .then(response => response.json())
            .then(json => {
                setState({
                    ...state,
                    lineaOrden: json
                })
            })
            .catch(error => {
                return error;
            })
    }, []) 

    return (
        <div className='divOrd'>

            <h1>Detalle de Orden </h1>

            <Table celled selectable className="ui five column table">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Producto ID</Table.HeaderCell>
                        <Table.HeaderCell>Cantidad</Table.HeaderCell>
                        <Table.HeaderCell>Precio Unitario</Table.HeaderCell>
                        <Table.HeaderCell>Total</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {state.lineaOrden && state.lineaOrden.map(linea => {
                        return (
                            <Table.Row>
                                <Table.Cell>{linea.productId}</Table.Cell>
                                <Table.Cell>{linea.cantidad}</Table.Cell>
                                <Table.Cell>{linea.price}</Table.Cell>
                                <Table.Cell>{linea.price * linea.cantidad}</Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>

            </Table>

        </div>
    )

}