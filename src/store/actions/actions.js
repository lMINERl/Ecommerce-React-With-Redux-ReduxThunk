import productAPI from '../../API/productAPI';
import { initialState } from '../reducer';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
export const GET_PRODUCT = 'GET_PRODUCT';
export const ERROR = 'ERROR';
export const CHACECHANGE = 'CHACECHANGE';


export const addDispatch = (arg) => {

    const { value } = arg;

    return dispatch => {
        productAPI.addProduct(value)
            .then(
                v => {
                    dispatch(addProduct({ _id: v.data._id, ...value }));
                }
            )
            .catch(err => dispatch(riseError(err)));

    }
}
export const getProductDispatch = (id) => {
    // shallow guard for making less requests to API
    let index = initialState.products.findIndex(p => p._id.toString() === id.toString());
    if (index !== -1) {
        console.log("no requests made");
        return getProductById(initialState.products[index]); // maintain immutability & predictability

    } else {
        return dispatch => {
            productAPI.getProductById(id)
                .then(
                    v => {
                        dispatch(getProductById(v.data));
                    }
                )
                .catch(err => dispatch(riseError(err)));
        }
    }
}

export const deleteProductDispatch = (arg) => {

    const { _id } = arg;
    return dispatch => {
        productAPI.deleteProduct(_id)
            .then(
                (v) => {
                    if (v.data.ok) {
                        dispatch(deleteProduct(_id));
                    }
                }
            )
            .catch(err => dispatch(riseError(err)));
    }
}

export const getAllProductsDispatch = () => {

    return dispatch => {
        productAPI.getAllProducts()
            .then(
                v => {
                    dispatch(getAllProducts({ data: v.data }));
                }
            )
            .catch(err => dispatch(riseError(err)));
    }
}

export const DispatchChangeCache = () => {
    return dispatch => {
        caheChange();
    }
}



export const getAllProducts = (products) => {
    return { type: GET_ALL_PRODUCTS, payload: products }
}

export const getProductById = (product) => {
    return { type: GET_PRODUCT, payload: product }
}

export const addProduct = (product) => {
    return { type: ADD_PRODUCT, payload: product }
}

export const deleteProduct = (id) => {
    return { type: DELETE_PRODUCT, payload: id }
}

export const riseError = (msg) => {
    return { type: ERROR, payload: msg }
}
export const caheChange = () => {
    return { type: CHACECHANGE, payload: null };
}