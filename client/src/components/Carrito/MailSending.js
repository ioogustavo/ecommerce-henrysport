import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { SendEmail} from '../../actions/index.js'
import { Button } from 'semantic-ui-react'

export function Mailsending(props){

  const [email, setMail]= useState({
      id: [],
      name: [],
      email: [],
  })

  useEffect(() => {
    
    let usuario = localStorage.getItem('user')
    if (usuario) {
        let usuarioJSON = JSON.parse(usuario)
        let usuarioJSONid = usuarioJSON.id
        let usuarioJSONname = usuarioJSON.name
        let usuarioJSONemail = usuarioJSON.email
        setMail({
            id: usuarioJSONid,
            name: usuarioJSONname,
            email: usuarioJSONemail
        })
    }
}, [])

const actualizarEstado = (e) => {
    setMail({
      ...email,
      [e.target.name]: e.target.value, //modifica el valor del input y lo guarda en actualizarState
    });
  };
  
  const MailSubmit = (e) => {
    actualizarEstado({
        id: [],
      name: [],
      email: [],
    });
  
  };

  const handleSubmit = async (event, email) => {
    event.preventDefault()

    SendEmail(email)

   
  }



    return (
        <form onSubmit={(event) => handleSubmit(event, email)}>
         <Button onSubmit={MailSubmit}>Enviar Mail</Button>
        </form>
    )
}

function mapStateToProps(state) {
    console.log(state)
    return {
      usuarioGuardado: state.usuarios
    }
  }
  function mapDispatchToProps(dispatch) {
    return {
      SendEmail: title => dispatch(SendEmail(title))
    };
  }


export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Mailsending)