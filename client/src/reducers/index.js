const initialState = {
    products: [],
    productDeleted: [],
    productsLoaded: [],
    productsDetail: {},
    putProductModify: [],
    categoryLoaded: [],
    productCategories: [],
    productsToCart: [],
    usuarios: [],
    logUsers: [],
    domicilios: [],
    categoryCreated: []
}

export default function rootReducer(state = initialState, action) {
    if (action.type === 'GET_PRODUCTS') {
        return {
            ...state,
            productsLoaded: state.productsLoaded.concat(action.payload)
        }
    } else if (action.type === 'GET_PRODUCTS_DETAILS') {
        return {
            ...state,
            productsDetail: action.payload.Search
        }
    } else if (action.type === 'ADD_PRODUCT') {
        return {
            ...state,
            // products: state.products.concat(action.payload)
            products: action.payload
        }
    } else if (action.type === 'PUT_PRODUCT') {
        return {
            ...state,
            // productsLoaded: state.products(action.payload)
        }
    } else if (action.type === 'ALL_PRODUCTS') {
        return {
            ...state,
            // products: state.products(action.payload)
            products: action.payload
        }
    } else if (action.type === "FILTER_PRODUCT_CATEGORY") {
        return {
            ...state,
            categoryLoaded: action.payload
        }
    } else if (action.type === 'DELETE_PRODUCT') {
        return {
            ...state,
            productDeleted: action.payload
        }
    } else if (action.type === 'POST_PRODUCT_TO_CART') {
        return {
            ...state,
            productsToCart: action.payload
        }
    } else if (action.type === 'DELETE_PRODUCT_CART') {

    } else if (action.type === 'ADD_CATEGORY') {
        return {
            ...state,
            categoryCreated: action.payload
        }
    } else if (action.type === "ADD_USER") {
        return {
            ...state,
            usuarios: state.usuarios.concat(action.payload)
        }
    } else if (action.type === 'DELETE_USER') {
        return {
            ...state,
            usuarios: action.payload
        }
    } else if (action.type === "SIGN_IN") {
        localStorage.setItem('usuarioLogeado', action.payload)
        return {
            ...state,
            logUsers: action.payload
        }
        // else return window.location.assign("http://localhost:3000/"); 
    } else if (action.type === "USER_TO_ADMIN") {
        return {
            ...state,
            usuarios: action.payload
        }
    }else if (action.type === "GET_USER") {
        return {
            ...state,
            usuarios: action.payload
        }
    } else if (action.type === "RESET_PASSWORD") {
        return {
            ...state,
            usuarios: action.payload
        }
    }else if (action.type === "UPDATE_USER") {
        return {
            ...state,
            usuarios: action.payload
        }
    } else if (action.type === "SET_DOMICILIO") {
        return {
            ...state,
            domicilios: state.domicilios.concat(action.payload)
        }
    } 
    else {
        return {
            ...state
        }
    }

}
