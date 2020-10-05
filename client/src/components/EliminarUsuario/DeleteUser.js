import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { deleteUsers, getAllUser } from '../../actions/index.js'
import swal from "sweetalert";


export function DeleteUser(props){

    const [DeleteUser, SetDeleteUser] = useState([]);

return (

    <div className="contenedorSB">

      <div className="buscador">
        <form onSubmit={(e) => {
          e.preventDefault();
          SetDeleteUser("");
          props.getAllUser(DeleteUser);
        }}>
          <input
            placeholder="Busca un usuario"
            type="search"
            value={DeleteUser}
            onChange={e => SetDeleteUser(e.target.value)}
          />
          <button className="button" type="submit" >
            <i className="material-icons"> search</i>
          </button>
        </form>
      </div>
     
      <div>
        <div className='bodycards'>
          {console.log(props.usuarios)}
          {props.usuarios ?  props.usuarios.map((UsuarioEncontrado, id) => {

            return (
              <div className="card" styles="width: 18rem;" >
                 
               <div className="card-body">
                 <h5 className="card-title">{UsuarioEncontrado.name + " " + UsuarioEncontrado.lastName}</h5> 
                  <p className="card-text">Email: {UsuarioEncontrado.email} </p>
                  <h6 className="card-text">rol: {UsuarioEncontrado.rol} </h6>
                  <button className="btn btn" onClick={e => {
                     e.preventDefault(e)
                     
                    props.deleteUsers(UsuarioEncontrado.id)
                  
                    return swal({
                      title: UsuarioEncontrado.name + UsuarioEncontrado.lastName,
                      text: "Fue eliminado correctamente",
                      icon: "success",
                      timer: "2500",
                    });
                   
                  }}
                  >Eliminar Usuario
                  </button>
                  

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
        deleteUsers: title => dispatch(deleteUsers(title))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeleteUser)