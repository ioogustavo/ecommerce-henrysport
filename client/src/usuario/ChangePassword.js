import React, { useState, useEffect } from 'react'
import { Link, Redirect } from "react-router-dom";
import {useHistory} from 'react-router-dom';
import {ResetPassword, verifyPass} from '../actions/index.js'
import { connect } from "react-redux";
import './changePass.css'


export function PasswordSettings(props){

    const [errors, setErrors] = useState({});
    const [contraseña, setContraseña]= useState({
        id: [],
        password: '',
        confirmPassword: '',
        new_password: ''
    })

    const confirmarDatos= (e) => {
        setContraseña({
          ...contraseña,
          [e.target.name]: e.target.value
        });
        setErrors(validate({
          ...contraseña,
          [e.target.name]: e.target.value,
        }));
      }
      const submitPassword = (e) => {
        confirmarDatos({
            password: '',
            confirmPassword: '',
            new_password: ''
        });
      
      };

      useEffect(() => {
    
        let usuario = localStorage.getItem('user')
        if (usuario) {
            let usuarioJSON = JSON.parse(usuario)
            let usuarioJSONid = usuarioJSON.id
            setContraseña({
                id: usuarioJSONid
            })
        }
    }, [])
     
      
    

    return (
        <div className="contenedorChangePass">
    
    <div>
        <form className="container_info_user" 
        onSubmit={ (e) => {
            e.preventDefault()
            props.verifyPass(contraseña)
            props.ResetPassword(contraseña)
            } } >
          <div className="catalogo_bg"></div>
          <h3 className="tituloInput">Cambiar tu contraseña</h3>
          <div className="new_password">
            {errors.new_password && ( <p id="error" className="danger">{errors.new_password}</p> )}
            <input
                id="inputs"
                className={`${errors.password && 'danger'}`}
                type="password"
                name="new_password"
                placeholder="Introduzca su nueva contraseña"
                onChange={confirmarDatos}
                value={contraseña.new_password}
                required 
                />
            
            <input 
                className="inputs"
                type="password" 
                id="newPass"
                name="confirmPassword"
                placeholder="Introduzca nuevamente su nueva contraseña"
                placeholder="Introduzca su nueva contraseña"
                onChange={confirmarDatos}
                value={contraseña.confirmPassword}
                 required />
          </div>
          <button onSubmit={submitPassword} type="submit" id="botonSubmit"> Cambiar Contraseña </button>
          
    
          
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
      ResetPassword: title => dispatch(ResetPassword(title)),
      verifyPass: title => dispatch(verifyPass(title))
    };
  }
  
  export function validate(contraseña) {
    let errors = {};
  

  if(!/([A-Za-z][A-Za-z0-9]*[0-9][A-Za-z0-9])/.test(contraseña.new_password)) {
    errors.new_password = 'La contraseña debe contener una letra mayuscula y al menos dos numeros';
  }else if(contraseña.new_password !== contraseña.confirmPassword){
    errors.new_password= "Las contraseñas no coinciden"
  } 
    return errors;
  };
 
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PasswordSettings)