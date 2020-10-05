import React from "react";
import './dropdown.css'
import { logoutUser } from '../../actions/index.js'
import { connect } from "react-redux";



export function Dropdown() {

  function a(event) {
    event.preventDefault();
    logoutUser()
    localStorage.removeItem('user')
    
    window.location.reload(false);
  }

  return (
    <div className="dropdown-container">
      <span className="material-icons">person_pin</span>

      <ul className="rutas">
        <a href="/User">
          <div className="drop">Mi perfil</div>
        </a>

        <a href="/User/Ordenes">
          <div className="drop">Ordenes</div>
        </a>

        <a href="/User/Configuracion">
          <div className="drop">Configuración</div>
        </a>

        <div className="drop">
          <button className="botonLogOut" onClick={e => a(e)}><a>Cerrar Sesión</a></button>
        </div>

      </ul>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    logoutUser: title => dispatch(logoutUser())
  };
}

export default connect(
  mapDispatchToProps,
)(Dropdown)
