import axios from 'axios';
import swal from "sweetalert";

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCTS_DETAIL = 'GET_PRODUCTS_DETAIL';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const PUT_PRODUCT = 'PUT_PRODUCT';
export const ALL_PRODUCTS = 'ALL_PRODUCTS';
export const FILTER_PRODUCT_CATEGORY = 'FILTER_PRODUCT_CATEGORY';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const ASSING_CATEGORY_TO_PRODUCTS = 'ASSING_CATEGORY_TO_PRODUCTS';
export const POST_PRODUCT_TO_CART = 'POST_PRODUCT_TO_CART';
export const DELETE_PRODUCT_CART = 'DELETE_PRODUCT_CART';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const DELETE_CATEGORY = 'ADD_CATEGORY';
export const ADD_USER = 'ADD_USER';
export const DELETE_USER = 'DELETE_USER';
export const SIGN_IN = 'SIGN_IN';
export const USER_TO_ADMIN = 'USER_TO_ADMIN';
export const GET_USER = 'GET_USER';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const UPDATE_USER = 'UPDATE_USER';
export const VERIFY_PASSWORD = 'VERIFY_PASSWORD';

export function getAllProducts() {
    return function (dispatch) {
        return fetch(`http://localhost:3000/products`)
            .then(response => response.json())
            .then(json => {
                dispatch({
                    type: 'ALL_PRODUCTS',
                    payload: json
                });
            });
    }
}

export function getProducts(idProduct) {
    return function (dispatch) {
        return fetch(`http://localhost:3000/products/search/${idProduct}`)
            .then(response => response.json())
            .then(json => {
                dispatch({
                    type: 'GET_PRODUCTS',
                    payload: json
                });
            });
    }
}

export function getProductsByCategory(value) {
    return function (dispatch) {
        return fetch(`http://localhost:3000/products/category/${value}`)
            .then(response => response.json())
            .then(json => {
                dispatch({
                    type: 'FILTER_PRODUCT_CATEGORY',
                    payload: json
                });
            });
    }
}

export function addProducts(payload) {
    var categorias = payload.categoriasElegidas;

    var url = 'http://localhost:3000/products';

    return function (dispatch) {
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(payload),
            // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(json => {
                let id = json.id;
                let direccion = `http://localhost:3000/products/${id}/category/${categorias}`;

                fetch(direccion, {
                    method: 'POST',
                    body: json
                })

                dispatch({
                    type: 'ADD_PRODUCT',
                    payload: json
                })
            })
    }

}

export function putProducts(payload) {
    var id = payload.id
    var url = `http://localhost:3000/products/${id}`;
    var pay = JSON.stringify(payload)
    return function (dispatch) {
        const pProd = axios({
            method: 'PUT',
            url: url,
            headers: {
                'Content-Type': 'application/json'
            },
            data: payload
        })
        // pProd.then(response => response.json())
        pProd.then(json => {
            swal({
                text: "Producto actualizado, recargue la página",
                icon: "success",
                timer: "2000",
            })
            dispatch({
                type: 'PUT_PRODUCT',
                payload: json
            })
        })
        pProd.catch(err => {
        })
    }

}

export function putCategory(payload) {
    var id = payload.id
    var url = `http://localhost:3000/products/category/put/${id}`;

    return function (dispatch) {
        return fetch(url, {
            method: 'PUT',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(json => {
                swal({
                    text: "La categoria ha sido modificado",
                    icon: "success",
                    timer: "2000",
                });
            });
    }
}

export function deleteProducts(payload) {
    var id = payload
    var url = `http://localhost:3000/products/delete/${id}`

    const borrar = axios({
        method: 'delete',
        url: url,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function deleteCategory(payload) {
    var id = payload
    var url = `http://localhost:3000/products/category/${id}`

    const borrar = axios({
        method: 'delete',
        url: url,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    swal({
        text: "La categoria ha sido eliminada",
        icon: "success",
        timer: "2000",
    });
}

export function addProductsToCart(payload, id) {

    let completo = 0;
    let total = payload.map(sumo => {
        let priceProd = sumo.price;
        let priceParsed = parseInt(priceProd, 10)

        let cantProd = sumo.quantity
        let cantidadParseada = parseInt(cantProd, 10)

        completo = completo + priceParsed * cantidadParseada;
    })

    let cantidad = 0;
    let nada = payload.map(sumo => {

        let cantProd = sumo.quantity
        let cantidadParseada = parseInt(cantProd, 10)

        cantidad = cantidad + cantidadParseada;
    })

    let arrayId = []

    let tomoId = payload.map(productoId => {
        arrayId.push(productoId.id)
    })

    const pet = axios({
        method: 'post',
        url: `http://localhost:3000/users/${id}/cart`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            payload, completo, cantidad
        },
    })
    // pet.then(json => {
    //     localStorage.setItem('user', JSON.stringify(json.data));
    // })
    // pet.catch(error => {
    //     alert("User not found");
    //     return;
    // });
}

export function deleteProductCarrito(payload) {
    var url = `http://localhost:3000/users/13/cart`
    return function (dispatch) {
        return fetch(url, {
            method: 'DELETE',
            body: JSON.stringify(payload)
        })
            .then(json => {
                dispatch({
                    type: 'DELETE_PRODUCT_CART',
                    payload: json
                });
            });
    }
}

export function addCategory(payload) {
    let url = 'http://localhost:3000/products/category'
    return function (dispatch) {
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(payload),
            // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(json => {
                swal({
                    text: "La categoria ha sido creada",
                    icon: "success",
                    timer: "2000",
                })
                dispatch({
                    type: 'ADD_CATEGORY',
                    payload: json
                })
            })

    }
}

export function addUser(payload, email) {

    var url2 = `http://localhost:3000/users/${payload.email}`

    return function (dispatch) {
        fetch(url2).then(response => response.json())
            .then(response => {
                dispatch({
                    type: 'ADD_USER',
                    payload: response
                });
                if (response === "ya existe un usuario con este email") {
                    return swal({
                        text: "Ya existe un usuario con este email",
                        icon: "error",
                        timer: "2000",
                    });
                } else {
                    var url = 'http://localhost:3000/users';
                    fetch(url, {
                        method: 'POST', // or 'PUT'
                        body: JSON.stringify(payload),
                        // data can be `string` or {object}!
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(response => response.json())
                        .then(json => {
                            dispatch({
                                type: 'ADD_USER',
                                payload: json
                            });
                        });
                    return swal({
                        text: "Se ha creado el usuario exitosamente, ahora haga click en el boton iniciar sesion para disfrutar de HenrySport",
                        icon: "success",
                        timer: "2000",
                    });;

                }
            })
    }


}

export function deleteUsers(payload) {
    var id = payload
    var url = `http://localhost:3000/users/${id}`
    return function (dispatch) {
        fetch(url, {
            method: 'DELETE'
        })
            // .then(response => response.json())
            .then(json => {
                dispatch({
                    type: 'DELETE_USER',
                });
            });
        return swal({
            text: "Usuario eliminado",
            icon: "success",
            timer: "2000",
        });;
    }
}


export const loginUser = (payload) => {
    const pet = axios({
        method: 'post',
        url: 'http://localhost:3000/auth/login',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            email: payload.email,
            password: payload.password,
        },
    })
    pet.then(json => {
        localStorage.setItem('user', JSON.stringify(json.data));
        swal({
            text: "Ha iniciado sesión correctamente",
            icon: "success",
            timer: "2000",
        });
        window.location.reload(false);
    })
    pet.catch(error => {
        swal({
            text: "Usuario no encontrado",
            icon: "warning",
            timer: "2000",
        });
        return;
    });

}

export const logoutUser = () => {
    const pet = axios({
        method: 'get',
        url: 'http://localhost:3000/auth/logout',
    })
    pet.then(json => {
        localStorage.removeItem('user')
        swal({
            text: "Se ha cerrado la sesion",
            icon: "success",
            timer: "2000",
        });

    })
    pet.catch(error => {
        swal({
            text: "Error",
            icon: "warning",
            timer: "2000",
        });
        return;
    });

}

export function Usertoadmin(id) {
    var payload

    var url = `http://localhost:3000/Admin/promote/${id}`;


    return function (dispatch) {
        return fetch(url, {
            method: 'PUT',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(json => {
                dispatch({
                    type: 'USER_TO_ADMIN',

                })
            });

    }
}

export function getAllUser(id) {
    if (typeof idUser !== "object") {
        return function (dispatch) {
            return fetch(`http://localhost:3000/Admin/search/${id}`)
                .then(response => response.json())
                .then(json => {
                    dispatch({
                        type: 'GET_USER',
                        payload: json
                    });
                });
        }
    }
}


export function verifyPass(payload) {
    var id = payload.id

    var url = `http://localhost:3000/users/${id}/passVerify`
    return function (dispatch) {
        return fetch(`http://localhost:3000/users/${id}/passVerify`)
            .then(response => response.json())
            .then(json => {
                dispatch({
                    type: 'VERIFY_PASS',
                    payload: json
                });
            });
    }
}

export function ResetPassword(payload) {
    var id = payload.id
    var url = `http://localhost:3000/users/${id}/passwordReset`;
    return function (dispatch) {
        return fetch(url, {
            method: 'PUT',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(json => {
                dispatch({
                    type: 'RESET_PASSWORD',
                    payload: json
                });
                swal({
                    text: "Se cambio la contraseña exitosamente",
                    icon: "success",
                    timer: "2000",
                });
            });
    }
}



export function UpdateUser(payload) {
    var id = payload.id
    var url = `http://localhost:3000/users/${id}`;
    return function (dispatch) {
        return fetch(url, {
            method: 'PUT',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(json => {
                dispatch({
                    type: 'UPDATE_USER',

                });
                swal({
                    text: "Se actualizaron los datos exitosamente",
                    icon: "success",
                    timer: "2000",
                });
            });
    }
}

export function Domicilio(payload) {
    var id = payload.id

    var url = `http://localhost:3000/users/${id}/domicilio`
    return function (dispatch) {
        return fetch(url, {
            method: 'PUT',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(json => {
                dispatch({
                    type: 'SET_DOMICILIO',

                });
                swal({
                    text: "Destino de envio cargado",
                    icon: "success",
                    timer: "2000",
                });
            });
    }
}

export function addReview(star, description, userId, productId) {
    var url = `http://localhost:3000/product/${productId}/review`;
    console.log(star)
    axios({
        method: "post",
        url: url,
        headers: {
            "Content-Type": "application/json",
        },
        data: {
            star,
            description,
            userId,
        },
    });
}

export function deleteReview(idReview) {
    console.log(idReview);
    var url = `http://localhost:3000/product/${idReview}/review`;

    axios({
        method: "delete",
        url: url,
        headers: {
            "Content-Type": "application/json",
        },
        data: {
            idReview,
        },
    });
}

export function SendEmail(payload) {
    let id = payload.id;
    let name = payload.name;
    let email = payload.email
    axios({
        method: "POST",
        url: `http://localhost:3000/email/send-email/${id}`,
        headers: {
            "Content-Type": "application/json",
        },
        data: {
            id,
            name,
            email
        }
    }).then((response) => {
        if (response.data === 'success') {
            alert("Email sent, awesome!");
            this.resetForm()
        } else if (response.data === 'fail') {
            alert("Oops, something went wrong. Try again")
        }
    })

}

export function edReview(star, description, usuariolog, idReview) {
    console.log(idReview);
    var url = `http://localhost:3000/product/${idReview}/review`;

    axios({
        method: "put",
        url: url,
        headers: {
            "Content-Type": "application/json",
        },
        data: {
            star, description
        },
    });
}