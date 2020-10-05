import React from 'react';
import Dropdown from './Dropdown'
import Dropdown2 from './Dropdown2'

import './Nav.css';

import Logo from '../../images/henrysport.jpg'


export default function Nav({ onSearch }) {
  return (
    <nav className="navbar navbar-expand-lg ">
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
        crossOrigin="anonymous"
      ></link>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
      <span>
        <a href='/'><img src={Logo} alt="logo" /></a>
      </span>
      <span className="navbar-toggler-icon"></span>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a href="/Home" className="nav-link">
              Home{" "}
            </a>
          </li>
          <li className="nav-item">
            <a href="/catalogo" className="nav-link">
              Catalogo
            </a>
          </li>
{/*           <li className="nav-item">
            <a href="/Ofertas" className="nav-link">
              Ofertas
            </a>
          </li>
          <li className="nav-item">
            <a href="/Contacto" className="nav-link">
              Contacto
            </a>
          </li> */}
          <li className="nav-item">
            <a href="/Carrito">
              {localStorage.__cart !== undefined ? (
                <span className="material-icons">add_shopping_cart</span>
              ) : (
                <span className="material-icons">shopping_cart</span>
              ) }
            </a>
          </li>
          <li className="nav-item">
            {localStorage.user && <Dropdown component={(props) => <Dropdown {...props}  />} />}
          </li>
          
          <li className="nav-item">
            {!localStorage.user && <Dropdown2 component={(props) => <Dropdown2 {...props} />} />}
          </li>

        </ul>
      </div>
    </nav>
  );
};