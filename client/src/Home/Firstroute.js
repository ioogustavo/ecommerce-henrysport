import React from 'react';
import redux from 'redux';
import { Link } from 'react-router-dom';
import './firstroute.css'


export default function welcome() {
    return (
        <div>
      <div className="ContenedorFR" >
       
  
        <div >
          <div className="ContenedorDeBotones">
            <Link className="link" to={'/register'}>
              <button className="BotonHome"> Register</button>
            </Link>
         
            <Link className="link" to={'/login'}>
              <button className="BotonHome">Login</button>
            </Link>
          
        </div>
   </div>
     
  
      </div>
      </div>
    );
  }