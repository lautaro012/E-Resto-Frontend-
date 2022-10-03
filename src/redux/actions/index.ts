import { Dispatch } from "react";
import axios from 'axios'
import { Action, CardForm, Category, ProductDetail } from "../../Interfaces/Interfaces";
export const GET_PRODUCTS = 'GET_PRODUCTS'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_PRODUCTS_BY_NAME = 'GET_PRODUCTS_BY_NAME'
export const GET_FOOD_BY_ID = "GET_FOOD_BY_ID"
export const EMPTY_FOOD = "EMPTY_FOOD"
export const EDIT_FORM ='EDIT_FORM'



export const getProducts = (sort : String) => {

    return function(dispatch:Dispatch<Action>) {
        axios('http://localhost:3001/product').then(resp => resp.data)
        .then(resp => {
            if(sort === 'AZ') {
                resp.sort(function (a:ProductDetail, b:ProductDetail) {
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
                resp.sort(function (a:ProductDetail, b:ProductDetail) {
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
                resp.sort(function(a:ProductDetail, b:ProductDetail){return b.price - a.price})
            }
            if(sort === 'menor') {
                resp.sort(function(a:ProductDetail, b:ProductDetail){return a.price - b.price})
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
            axios('http://localhost:3001/category').then(resp => resp.data)
            .then(res => {
                dispatch({
                    type: GET_PRODUCTS_BY_NAME,
                    payload: {
                    res,
                    name: name
                    }
                })
            })
        }
    } else {
        return function (dispatch:Dispatch<Action>) {
            axios('http://localhost:3001/category').then(resp => resp.data)
            .then(resp => {
                dispatch({
                    type:GET_CATEGORIES,
                    payload:resp
                })
            })
        }
    }
}

export const getCategories = (sort: string) => {
    return function (dispatch: Dispatch<Action>) {
        axios('http://localhost:3001/category').then(resp => resp.data)
            .then(resp => {
                //console.log("RESP", resp)
                resp.map((cat: Category) => {

                    if (sort === 'AZ') {
                        cat.categoryProducts.sort(function (a: ProductDetail, b: ProductDetail) {
                            if (a.name > b.name) {
                                return 1;
                            }
                            if (a.name < b.name) {
                                return -1;
                            }
                            return 0;
                        });
                    }
                    if (sort === 'ZA') {
                        cat.categoryProducts.sort(function (a: ProductDetail, b: ProductDetail) {
                            if (b.name > a.name) {
                                return 1;
                            }
                            if (b.name < a.name) {
                                return -1;
                            }
                            return 0;
                        });
                    }
                    if (sort === 'mayor') {
                        cat.categoryProducts.sort(function (a: ProductDetail, b: ProductDetail) { return b.price - a.price })
                    }
                    if (sort === 'menor') {
                        cat.categoryProducts.sort(function (a: ProductDetail, b: ProductDetail) { return a.price - b.price })
                    }
                })
                dispatch({
                    type: GET_CATEGORIES,
                    payload: resp
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

export const createProduct = function (input:CardForm) {
    return function(dispatch:Dispatch<Action>){
        axios.post('http://localhost:3001/product', input)
        .then(res => console.log(res.data))
        .catch(error => console.log(error))
    }
}

export const getFoodById = (id:string) => {
    return function(dispatch:Dispatch<Action>) {
        axios(`http://localhost:3001/product/${id}`).then(resp => resp.data)
        .then(resp => {
            dispatch({
                type:GET_FOOD_BY_ID,
                payload:resp
            })
        })
    }
}

export const vaciarComida = function () {
    return function(dispatch:Dispatch<Action>){
        dispatch({
            type: EMPTY_FOOD,
        })
    }
}

export const fillFormData = (input:CardForm) => {
    return function(dispatch:Dispatch<Action>){
        dispatch({
            type:EDIT_FORM,
            payload: input
        })
    }
}

export const editProduct = (input:CardForm, id:number) => {
    return function(dispatch:Dispatch<Action>) {
        axios.put(`http://localhost:3001/product/${id}`, input).then(res => res.data)
        .then(resp => {
            console.log(resp)
        })
        .catch(err => console.log(err))
    }
}

export const deleteProduct = (id:string) => {
    axios.delete(`http://localhost:3001/product/${id}`).then(res => res.data)
    .then(res => console.log(res))
    .catch(err => console.log(err))
}