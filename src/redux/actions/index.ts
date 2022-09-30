import { Dispatch } from "react";
import axios from 'axios'
export const GET_PRODUCTS = 'GET_PRODUCTS'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_PRODUCTS_BY_NAME = 'GET_PRODUCTS_BY_NAME'

type Action = {
    type: string;
    payload?: any;
};

export const getProducts = (sort : String) => {

    return function(dispatch:Dispatch<Action>) {
        axios('http://localhost:3001/product').then(resp => resp.data)
        .then(resp => {
            if(sort === 'AZ') {
                resp.sort(function (a:any, b:any) {
                if (a.name > b.name) {
                  return 1;
                }
                if (a.name < b.name) {
                  return -1;
                }
                return 0;
              });
            }
            if(sort === 'ZA') {
                resp.sort(function (a:any, b:any) {
                    if (b.name > a.name) {
                      return 1;
                    }
                    if (b.name < a.name) {
                      return -1;
                    }
                    return 0;
                  });
            }
            if(sort === 'mayor') {
                resp.sort(function(a:any, b:any){return b.price - a.price})
            }
            if(sort === 'menor') {
                resp.sort(function(a:any, b:any){return a.price - b.price})
            }
            //   console.log(resp)
            dispatch({
                type: GET_PRODUCTS,
                payload: resp
            })
        })
        .catch(err => console.log(err))
    }
}

export const getProductsByName = (name : String) => {
    if(name) {
        return function (dispatch:Dispatch<Action>) {
            try {
                axios(`http://localhost:3001/product?name=${name}`)
                .then(res => res.data)
                .then(res => {
                    dispatch({
                    type: GET_PRODUCTS_BY_NAME,
                    payload: res
                })
                })
                .catch(err => console.log(err))
            } catch(err) {
               console.log(err)
            }
        }
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

