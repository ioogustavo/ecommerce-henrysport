import React, { useEffect } from 'react';
import './AdminSettings.css';
import { Link } from 'react-router-dom';
import { use } from 'passport';
import swal from "sweetalert";
import axios from 'axios';
import { useHistory } from "react-router-dom";

export default function About() {
    const history = useHistory();
    useEffect(() => {
        if (localStorage.user) {
            let locala = JSON.parse(localStorage.user)
            if (locala.rol === 'admin') {
                swal({
                    text: "Bienvenido Admin",
                    icon: "success",
                    timer: "2000",
                });
            } else {
                swal({
                    text: "No tiene permiso para acceder a esta sección",
                    icon: "error",
                    timer: "2000",
                });
                history.push('/home')
            }
        } else {
            swal({
                text: "No tiene permiso para acceder a esta sección",
                icon: "error",
                timer: "2000",
            });
            history.push('/home')
        }


        // const pet = axios({
        //     url: 'http://localhost:3000/auth/admin',
        // })
        // pet.then(admin => {
        //     if (admin === "Sos admin") {

        //     } else if (admin === "Es necesario el token de autenticación o no sos admin") {
        //         swal({
        //             text: "No tiene permiso para acceder a esta sección",
        //             icon: "error",
        //             timer: "2000",
        //         });
        //         history.push('/home')
        //     }
        // })

    })
    return (
        <div className="total">
            <h3 className="AdminTitulo">ADMIN SETTINGS</h3>
            <div className="container">

                <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@600&display=swap" rel="stylesheet"></link>
                <div className="AllButtons">
                    <div className="buttonContainer">
                        <Link class="nav-link" to="/Admin/Producto">
                            <button className="botonAdmin">Productos</button>
                        </Link>

                        <Link class="nav-link" to="/Admin/Categoria">
                            <button className="botonAdmin">Categoria</button>
                        </Link>

                        <Link class="nav-link" to="/Admin/EliminarUsuarios">
                            <button className="botonAdmin">Eliminar Usuarios</button>
                        </Link>
                        <Link class="nav-link" to="/Admin/AsignarAdminsitradores">
                            <button className="botonAdmin">Asignar Administradores</button>
                        </Link>
                        <Link class="nav-link" to="/Admin/Ordenes">
                            <button className="botonAdmin">Ver Ordenes</button>
                        </Link>
                        <Link class="nav-link" to="/Admin/Usuarios">
                            <button className="botonAdmin">Lista de Usuarios</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
