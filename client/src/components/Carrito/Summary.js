import React from 'react'
import { Button } from 'semantic-ui-react'

export default function Summary(props) {
    return (
        <div>
            <h5>Total</h5>
            <h5>Iva</h5>
            <Button color='green'>Confirmar compra</Button>
        </div>
    )
}
