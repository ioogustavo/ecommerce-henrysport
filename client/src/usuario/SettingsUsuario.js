
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import './settings.css'
import { Button } from 'semantic-ui-react'
import ChangePassword from './ChangePassword'
import UserSettings from './DatosUserSettings'
import './settings.css'






export default function Settings() {


return (
    <div className="containerSettings">
        <h3 className="SettingsTitulo">Configuracion</h3>
        <div >

            <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@600&display=swap" rel="stylesheet"></link>
            <div className="PasswordSettings">
                
                    <ChangePassword/>
                </div>

                <div className="UserSettings">
                   <UserSettings/>
                </div>
            </div>
        
        <div className="botonVolver">
           <Link to="/Home" ><button class="btn btn" id="botoncito"> 
              VOLVER AL INICIO
            </button></Link>
          </div>
    </div>
);
}
