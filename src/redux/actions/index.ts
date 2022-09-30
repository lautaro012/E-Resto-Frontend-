import { Dispatch } from "react";
import axios from 'axios'
export const GET_PRODUCTS = 'GET_PRODUCTS'
export const GET_CATEGORIES = 'GET_CATEGORIES'

type Action = {
    type: string;
    payload?: any;
};

export const getProducts = () => {
    return function(dispatch:Dispatch<Action>) {
        axios('http://localhost:3001/product').then(resp => resp.data)
        .then(resp => {
            dispatch({
                type: GET_PRODUCTS,
                payload: resp
            })
        })
        .catch(err => console.log(err))
    }
}

export const getCategories = () => {
    return function(dispatch:Dispatch<Action>) {
        axios('http://localhost:3001/category').then(resp => resp.data)
        .then(resp => {
            dispatch({
                type:GET_CATEGORIES,
                payload:resp
            })
        })
    }
}
export const clear = function (payload:any) {
    return function(dispatch:Dispatch<Action>){
        dispatch({
            type: 'CLEAR',
            payload
        })
    }
}
export const createForm = function (input:any) {
    return function(dispatch:Dispatch<Action>){
        axios.post('http://localhost:3001/product', input)
        .then(res => console.log(res.data))
        .catch(error => console.log(error))
    }
}

// export const getProductsByName = function (name : string) {
//     if(name) {
//         return async function (dispatch:Dispatch<Action>) {
//             try {
//                 let res = await axios (`/product?name=${name}`)
//                 dispatch({
//                     type: 'GET_PRODUCTS_BY_NAME',
//                     payload: res.data
//                 })
//             } catch(err) {
//                 dispatch({
//                     type: 'GET_PRODUCTS_BY_NAME',
//                     payload: 'no encontramos el producto'
//                 })
//             }
//         }
//     }
//     else {
//         return async function (dispatch:Dispatch<Action>) {
//             let res = await axios ('/product')
//             dispatch({
//                 type: 'GET_ALL_PRODUCTS',
//                 payload: res.data
//             })
//         }
//     }

// }