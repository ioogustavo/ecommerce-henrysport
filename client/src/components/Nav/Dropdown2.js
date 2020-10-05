import React from "react";
import './Dropdown2.css'
import { logoutUser } from '../../actions/index.js'
import { connect } from "react-redux";

export function dropdown2() {

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
        <a href="/login">
          <div className="drop">LOGIN</div>
        </a>

        <a href="/register">
          <div className="drop">REGISTER</div>
        </a>

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
)(dropdown2)
