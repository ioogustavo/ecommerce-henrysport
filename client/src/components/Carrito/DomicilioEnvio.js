import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import './Carrito.css';
import { Domicilio} from '../../actions/index.js'
import { Button } from 'semantic-ui-react'



export function Domicilios(props){


  const[domicilio, setDomicilio]= useState({
        id: [],
        adress: ''
  })



  //Funcion que se ejecuta cada vez que el usuario escribe en un input
  const actualizarEstado = (e) => {
    setDomicilio({
      ...domicilio,
      [e.target.name]: e.target.value, //modifica el valor del input y lo guarda en actualizarState
    });
  };
  
  const submitAdress = (e) => {
    actualizarEstado({
        id: [],
        adress: ''
    });
  
  };

  useEffect(() => {
    
    let usuario = localStorage.getItem('user')
    if (usuario) {
        let usuarioJSON = JSON.parse(usuario)
        let usuarioJSONid = usuarioJSON.id
        setDomicilio({
            id: usuarioJSONid
        })
    }
}, [])

    return(
      <div>
        <div className="AdressContainer">
        <form onSubmit={ (e) => {
            e.preventDefault()
            props.Domicilio(domicilio)
            
        }}>
        <div className= "Direccion">
          <input
            type="text"
            name="adress"
            className="inputs"
            placeholder="Ingrese la direccion en la cual desea recibir su pedido, Ej.: Viamonte 530"
            onChange={actualizarEstado}
            value={domicilio.adress}
            required
          />
           <Button onSubmit={submitAdress} className="BotonAceptar" type="submit" color='green'> Aceptar </Button>
        </div>
       
       
          <dialog>Por Favor si es su primera vez comprando en HenrySport especifique la direccion en la cual desea recibir su pedido, en caso contrario puede utilizar la direccion de su ultima compra
        </dialog>
       
        </form>
     
        
        
        </div>
    </div>
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
      Domicilio: title => dispatch(Domicilio(title))
    };
  }


export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Domicilios)