import React, { useState, useEffect } from 'react'
import { Link, Redirect } from "react-router-dom";
import {useHistory} from 'react-router-dom';
import {UpdateUser} from '../actions/index.js'
import { connect } from "react-redux";
import './Datosuser.css'
import { Button } from 'semantic-ui-react'

export function UserSettings(props){

    
    const [Datos, setDatos]= useState({
        id: [],
        name: '',
        lastName: '',
        mobilephone: ''
    })

    const confirmarDatos= (e) => {
        setDatos({
          ...Datos,
          [e.target.name]: e.target.value
        });
      }
      const submitDatos = (e) => {
        confirmarDatos({
            name: '',
            lastName: '',
            mobilephone: ''
        });
      
      };

      useEffect(() => {
    
        let usuario = localStorage.getItem('user')
        if (usuario) {
            let usuarioJSON = JSON.parse(usuario)
            let usuarioJSONid = usuarioJSON.id
            setDatos({
                id: usuarioJSONid
            })
        }
    }, [])
     
      
    

    return (
        <div class="contenedorChangeU">
    
    <div>
        <form className="container_info_user" 
        onSubmit={ (e) => {
            e.preventDefault()
            props.UpdateUser(Datos)
            
            
            } } >
          <div className="catalogo_bg"></div>
          <h3 className="tituloInput">Cambiar nombre</h3>
          <div className="new_password">
            <div>
            <input
             type="text"
             className="inputsU"
             name="name"
             placeholder="Introduzca su nuevo Nombre"
             onChange={confirmarDatos}
             value={Datos.name}
             
             />
            
            </div>

            <div>
            <h3 className="tituloInput">Cambiar apellido</h3>
            <input
                type="text"
                name="lastName"
                className="inputsU"
                placeholder="Ingrese su apellido"
                onChange={confirmarDatos}
                value={Datos.lastName}
                 
                />
            </div>

            <div>
            <h3 className="tituloInput">Cambiar numero de celular</h3>
            <input 
                type="phone" 
                name="mobilephone"
                className="inputsU"
                placeholder="Ingrese su numero de Telefono"
                onChange={confirmarDatos}
                 value={Datos.mobilephone}
                  />
            </div>

          </div>
          <button onSubmit={submitDatos} id="botonSubmit" type="submit" > Actualizar Datos </button>
          

        </form>
        </div>
        </div>
      );
}


function mapStateToProps(state) {
    return {
      contraseñaCambiada: state.usuarios
    }
  }
  function mapDispatchToProps(dispatch) {
    return {
      UpdateUser: title => dispatch(UpdateUser(title))
    };
  }
  
 
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(UserSettings)