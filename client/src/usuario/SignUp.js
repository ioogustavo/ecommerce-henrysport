import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import './register.css'
import { addUser} from '../actions/index.js'
import {useHistory} from 'react-router-dom';
import { Button } from 'semantic-ui-react'



export function Register(props, response) {
    //Crear state de Producto
    
    const history = useHistory();
    const [state, setState] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        mobilephone: ''
    });
    const [errors, setErrors] = useState({});
 
    //Funcion que se ejecuta cada vez que el usuario escribe en un input
    const actualizarEstado = (e) => {
      setState({
        ...state,
        [e.target.name]: e.target.value, //modifica el valor del input y lo guarda en actualizarState
      });
      setErrors(validate({
        ...state,
        [e.target.name]: e.target.value,
      }));
    };
    console.log(state)
    const submitUser = (e) => {
      actualizarEstado({
        name: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        mobilephone: ''
      });
    
    };



    return (

      <div className="cont2">
        
          <form
            onSubmit={(e) => {
              e.preventDefault();
              props.addUser(state);
            }}
          >
            <div class="firstCont">
              <div className="Name" className={`${errors.name && "danger"}`}>
                <h2 className="titulosReg">Nombre</h2>
                  {errors.name && (
                  <p id="error" className="danger">
                    {errors.name}
                  </p>
                )}
                <input
                  type="text"
                  name="name"
                  className="inputs"
                  placeholder="Ingrese su nombre"
                  onChange={actualizarEstado}
                  value={state.name}
                  required
                />
              
              </div>


              <div
                className="Lastname"
                className={`${errors.lastName && "danger"}`}
              >
                <h2 className="titulosReg">Apellido</h2>
                {errors.lastName && (
                  <p id="error" className="danger">
                    {errors.lastName}
                  </p>
                )}
                <input
                  type="text"
                  name="lastName"
                  className="inputs"
                  placeholder="Ingrese su apellido"
                  onChange={actualizarEstado}
                  value={state.lastName}
                  required
                />
                
              </div>

              <div>
                <h2 className="titulosReg">Email</h2>
                {errors.email && (
                  <p id="error" className="danger">
                    {errors.email}
                  </p>
                )}
                <input
                  className={`${errors.email && "danger"}`}
                  type="text"
                  name="email"
                  className="inputs"
                  placeholder="Ingrese su email"
                  onChange={actualizarEstado}
                  value={state.email}
                  required
                />
                
              </div>
            </div>


            <div className="secondCont">
              <div>
                <h2 className="titulosReg">Contraseña</h2>  
                {errors.password && (
                  <p id="error" className="danger">
                    {errors.password}
                  </p>
                )}
                <input
                  className={`${errors.password && "danger"}`}
                  type="password"
                  name="password"
                  className="inputs"
                  placeholder="Ingrese su contraseña"
                  onChange={actualizarEstado}
                  value={state.password}
                  required
                />
              
              </div>

              <div>
                <h2 className="titulosReg">Confirme su contraseña</h2>
                <input
                  type="password"
                  name="confirmPassword"
                  className="inputs"
                  placeholder="Introduzca su contraseña nuevamente"
                  onChange={actualizarEstado}
                  value={state.confirmPassword}
                  required
                />
              </div>

              <div>
                <h2 className="titulosReg">Celular</h2>
                {errors.mobilephone && (
                  <p id="error" className="danger">
                    {errors.mobilephone}
                  </p>
                )}
                <input
                 className={`${errors.mobilephone && "danger"}`}
                  type="tel"
                  name="mobilephone"
                  className="inputs"
                  placeholder="Ingrese su numero de Telefono"
                  onChange={actualizarEstado}
                  value={state.mobilephone}
                  required
                />
                 
              </div>
            </div>
            <div id="botm">
              <button className="boton2" onSubmit={submitUser} type="submit">
                Registrarse
              </button>
            </div>

          </form>
        
      </div>
    );
  };
  
  
  function mapStateToProps(state) {
    return {
      usuarioGuardado: state.usuarios
    }
  }
  function mapDispatchToProps(dispatch) {
    return {
      addUser: title => dispatch(addUser(title))
    };
  }
  

  export function validate(state) {
    let errors = {};
   if(!state.name){
     errors.name= 'Por favor introduzca su nombre'
   }
   if(!state.lastName){
    errors.lastName= 'Por favor introduzca su apellido'
  }
    if (!state.email) {
      errors.email = 'Por favor introduzca su email';
    } else if (!/\S+@\S+\.\S+/.test(state.email)) {
      errors.email = 'El email es invalido';
    }
  if(!state.password){
    errors.password = 'Por favor introduzca su contraseña';
  } else if (!/([A-Za-z][A-Za-z0-9]*[0-9][A-Za-z0-9])/.test(state.password)) {
    errors.password = 'La contraseña debe contener una letra mayuscula y al menos dos numeros';
  }else if(state.password !== state.confirmPassword){
    errors.password= "Las contraseñas no coinciden"
  }
  if(!/(\([0-9]{3}\) [0-9]{4}[0-9]{4})/.test(state.mobilephone)){
 errors.mobilephone= "Un numero de telefono valido debe contener el codigo de area entre parentesis, seguido de un espacio y la menos 8 digitos" 
  }
    return errors;
  };
  
 

 
export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Register)

