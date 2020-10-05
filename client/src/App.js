import React from 'react';
import { Route } from 'react-router-dom';
import Inicio from './Home/Home.js';
import Firstroute from './Home/Firstroute.js';
import Nav from "./components/Nav/Nav";
import slider from './components/Slider/slider.js';
import SearchBar from "./components/Buscar/SearchBar.js";
import Productos from "./components/Catalogo/Productos.js";
import Carrito from './components/Carrito/Carrito.js';
import SignUp from './usuario/SignUp.js';
import AdminSettings from './components/AdminSettings'
import Producto from './components/Crud/Producto/Producto.js'
import Categoria from './components/Crud/Categoria/AgregarCategoria';
import EliminarUsuario from "./components/EliminarUsuario/DeleteUser.js"
import Ordenes from "./components/Orden/Orden.js"
import OrdenDetail from "./components/Orden/ordenDetail.js"
import OrdenUser from "./components/Orden/Orden-user.js"
import OrdenDetailUser from "./components/Orden/ordenDetailUser.js"
import './App.css';
import idproduto from './components/Producto/idproducto.js'
import StickyFooter from './components/footer/footer.js'
import 'semantic-ui-css/semantic.min.css'
import Login from './usuario/Login.js';
import AsignarAdminsitradores from "./components/AsignarAdminsitradores/AsignarAdminsitradores.js"
import Usuario from './usuario/Usuario.js'
import ListaUsers from './components/ListaUsuarios/AllUsers.js'
import DomicilioPlanilla from './components/Carrito/DomicilioEnvio.js';
import ContactUs from './components/Contacto/contacto.js'
import SendEmail from './components/Carrito/MailSending'
import UserSettings from './usuario/SettingsUsuario.js'

function App() {
  return (
    <div>
      <div className="App">
        <Route path="/" render={() => <Nav />} />
        {/* <Route exact path="/Home" component={slider} />
        <Route exact path="/Home" component={SearchBar} />  */}
        <Route exact path='/catalogo' component={Productos} />
        <Route exact path='/Contacto' />
        <Route exact path='/Ofertas' />
        {!localStorage.user && <Route exact path='/login' component={(props) => <Login {...props} />} />}
        {!localStorage.user && <Route exact path='/register' component={(props) => <SignUp {...props} />} />}
        <Route exact path='/User' component={Usuario} />
        <Route exact path='/Admin' component={AdminSettings} />
        <Route exact path='/Admin/Producto' component={Producto} />
        <Route exact path='/Admin/Categoria' component={Categoria} />
        <Route exact path='/Admin/EliminarUsuarios' component={EliminarUsuario} />
        <Route exact path='/Admin/Usuarios' component={ListaUsers} />
        <Route exact path='/Admin/Ordenes' component={Ordenes} />
        <Route exact path='/Admin/Ordenes/:id' component={OrdenDetail} />
        <Route exact path='/Admin/AsignarAdminsitradores' component={AsignarAdminsitradores} />
        <Route exact path='/Home' component={Inicio} />
        <Route exact path='/Carrito' component={Carrito} />
        <Route exact path='/Carrito' component={DomicilioPlanilla} />
        {/* <Route exact path='/Carrito' component={SendEmail} /> */}
        <Route exact path='/producto/:id' component={idproduto} />
        <Route exact path="/review" />
        <Route exact path="/User/configuracion" component={UserSettings} />
        <Route exact path="/" component={Firstroute} />
        <Route exact path="/Home" render={() => <StickyFooter />} />
        <Route exact path="/User" render={() => <StickyFooter />} />
        <Route exact path="/User/Configuracion" render={() => <StickyFooter />} />
        <Route exact path='/User/Ordenes' component={OrdenUser} />
        <Route exact path='/User/Ordenes/:id' component={OrdenDetailUser} />
        <Route exact path='/Contacto' component={ContactUs} />
      </div>
    </div>
  );
}


export default App;
