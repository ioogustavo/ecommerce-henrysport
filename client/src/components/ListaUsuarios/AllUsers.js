import {useDispatch, useSelector } from 'react-redux';
import swal from "sweetalert";
import { connect } from "react-redux";
import {Usertoadmin, getAllUser} from '../../actions/index.js';
import React, { useState, useEffect } from 'react';


export function SearchUsers(props) {

  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/products')
    .then(response => response.json())
    .then( props => {
        var newProp = "count"
       props.usuarios.map(prod => {
           prod[newProp] = 0;
       })


    })
    .catch(error => {
        return error;
    })
}, [])
  
  return (

    <div className="contenedorSB">

      <div className="buscador">
        <form onSubmit={(e) => {
          e.preventDefault();
          setUser("");
          props.getAllUser(user);
        }}>
          <input
            placeholder="Busca un usuario"
            type="search"
            value={user}
            onChange={e => setUser(e.target.value)}
          />
          <button className="button" type="submit" >
            <i className="material-icons"> search</i>
          </button>
        </form>
      </div>
     
      <div>
        <div className='bodycards'>
          {props.usuarios ?  props.usuarios.map((UsuarioEncontrado, id) => {

            return (
              <div className="card" styles="width: 18rem;" >
                 
               <div className="card-body">
                 <h5 className="card-title">{UsuarioEncontrado.name + " " + UsuarioEncontrado.lastName}</h5> 
                  <p className="card-text">Email: {UsuarioEncontrado.email} </p>
                  <h6 className="card-text">rol: {UsuarioEncontrado.rol} </h6>
                  <h6 className="card-text">mobilephone: {UsuarioEncontrado.mobilephone} </h6>
                </div>
              </div>
            )
            
          }): <div></div>
        }
        </div>
      
      </div>
      
    </div >
  );
}


function mapStateToProps(state) {
  return {
    usuarios: state.usuarios
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getAllUser: title => dispatch(getAllUser(title)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchUsers)

