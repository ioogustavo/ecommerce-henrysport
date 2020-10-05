import React, { useState, useEffect } from 'react';
import { loginUser } from '../actions/index.js';
import { connect } from "react-redux";
import './login.css';
import { useHistory } from 'react-router-dom';
import GoogleLogin from 'react-google-login'
import { useGoogleLogin } from 'react-google-login'
import swal from "sweetalert";

export function Login() {



  const history = useHistory();
  const [state, setState] = useState({
    email: '',
    password: ''
  })

  const iniciarSesion = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const SubmitUser = (e) => {
    iniciarSesion({
      email: '',
      password: ''
    })
  }

  const handleSubmit = async (event, state) => {
    event.preventDefault()

    loginUser(state)

    
    history.push("/Home")
   /*  window.location.reload(true); */
  }

  // const responseGoogle = (response) => {
  //   localStorage.setItem('user', JSON.stringify(response.profileObj));
  //   swal({
  //     text: "Ha iniciado sesión correctamente",
  //     icon: "success",
  //     timer: "2000",
  //   });
  // }

  return (
    // agrego action="/login"
    <div className="cont">
      <div className="log1">
        <form action="/login" onSubmit={(event) => handleSubmit(event, state)}>
          <div>
            <label>Email:</label>
            <input
              className="input"
              type="text"
              name="email"
              required
              onChange={iniciarSesion}
              value={state.email}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              className="input"
              type="password"
              name="password"
              required
              onChange={iniciarSesion}
              value={state.password}
            />
          </div>

          <button className="boton1" onSubmit={SubmitUser} type="submit">
            Inicia Sesión
            </button>
        </form>
        {/* <GoogleLogin
          clientId='141507517387-6lr8n6gieiu0o3tkvi4je948bp3afdnn.apps.googleusercontent.com'
          buttonText='Login'
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          isSignedIn={true}
          cookiePolicy={'single_host_origin'}
        /> */}
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    loginUser: title => dispatch(loginUser(title))
  };
}

function mapStateToProps(state) {
  return {
    usuarioGuardado: state.usuarios
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login)
