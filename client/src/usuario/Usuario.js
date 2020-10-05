import React, { useState, useEffect } from 'react'
import './Usuario.css'
import imagen from '../images/change-background-color-on-wix.jpg'
import { useHistory } from 'react-router-dom';
import { logoutUser } from '../actions/index.js'
import { connect } from "react-redux";
import { Button } from 'semantic-ui-react'


export function Usuario(props) {

    const history = useHistory();
    const [usuario, setUsuario] = useState({
        id: []
    })

    useEffect(() => {
        let usuarioExistente = localStorage.getItem('user')

        if (usuarioExistente) {
            let usuarioJSON = JSON.parse(usuarioExistente)
            setUsuario({
                id: usuarioJSON
            })
        }
    }, [])

    function a(event) {
        event.preventDefault();
        logoutUser()
        localStorage.removeItem('user')

        history.push("/Home")
        window.location.reload(false);
    }

    return (
        <div>
            {
                usuario.id &&
                <div class="container">
                    <div class="fb-profile">
                        <img align="left" class="fb-image-lg" src={imagen} alt="Profile image example" />
                        <img align="left" class="fb-image-profile thumbnail" src="https://www.congresoparques.com/salta/registros/img/icono_perfil.png" alt="Profile image example" />
                        <div class="fb-profile-text">
                            <h3>{usuario.id.name + " " + usuario.id.lastName}</h3>
                            <h3>{usuario.id.email}</h3>
                            <h3>{usuario.id.mobilephone}</h3>
                          <a href="/home"><Button onClick={e => a(e)} color="orange">Cerrar sesión</Button></a>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        logoutUser: title => dispatch(logoutUser())
    };
}

export default connect(
    mapDispatchToProps
)(Usuario)
