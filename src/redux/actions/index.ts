import { Dispatch } from "react";


type Action = {
    type: string;
    payload?: any;
};

export const clear = function (payload:any) {
    return function(dispatch:Dispatch<Action>){
        dispatch({
            type: 'CLEAR',
            payload
        })
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