import { Dispatch } from "react";
import axios from 'axios'
import { Action, CardForm, Category, ProductDetail } from "../../Interfaces/Interfaces";
export const GET_PRODUCTS = 'GET_PRODUCTS'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_PRODUCTS_BY_NAME = 'GET_PRODUCTS_BY_NAME'
export const GET_FOOD_BY_ID = "GET_FOOD_BY_ID"
export const EMPTY_FOOD = "EMPTY_FOOD"
export const EDIT_FORM = 'EDIT_FORM'
export const ACTUALIZAR_CART = "ACTUALIZAR_CART"
export const ADD_TO_CART = "ADD_TO_CART"
export const DELETE_FOR_CART = " DELETE_FOR_CART"
export const SUBSCRIBE_MAIL = 'SUBSCRIBE_MAIL'
export const ERROR_HANDLER = 'ERROR_HANDLER'
export const CLEAN_ERROR = 'CLEAN_ERROR'
export const GET_USER_BY_ID = 'GET_USER_BY_ID'
export const GET_USER = 'GET_USER'
export const GET_ALL_USERS = 'GET_ALL_USERS'
export const GET_USER_LOGGED = "GET_USER_LOGGED"

export const getProducts = (sort: String) => {

    return function (dispatch: Dispatch<Action>) {

        axios('http://localhost:3001/product').then(resp => resp.data)
            .then(resp => {
                if (sort === 'AZ') {
                    resp.sort(function (a: ProductDetail, b: ProductDetail) {
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
                    resp.sort(function (a: ProductDetail, b: ProductDetail) {
                        if (b.name > a.name) {
                            return 1;
                        }
                        if (b.name < a.name) {
                            return -1;
                        }
                        return 0;
                    });
                }
                if (sort === 'mayorPrecio') {
                    resp.sort(function (a: ProductDetail, b: ProductDetail) { return b.price - a.price })
                }
                if (sort === 'menorPrecio') {
                    resp.sort(function (a: ProductDetail, b: ProductDetail) { return a.price - b.price })
                }
                if (sort === 'mayorRating') {
                    resp.sort(function (a: ProductDetail, b: ProductDetail) { return b.rating - a.rating })
                }

                dispatch({
                    type: GET_PRODUCTS,
                    payload: resp
                })
            })
            .catch(err => console.log(err))
    }
}

export const getProductsByName = (name: String) => {
    if (name) {
        return function (dispatch: Dispatch<Action>) {
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
        return function (dispatch: Dispatch<Action>) {
            axios('http://localhost:3001/category').then(resp => resp.data)
                .then(resp => {
                    dispatch({
                        type: GET_CATEGORIES,
                        payload: resp
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
                    if (sort === 'mayorPrecio') {
                        cat.categoryProducts.sort(function (a: ProductDetail, b: ProductDetail) { return b.price - a.price })
                    }
                    if (sort === 'menorPrecio') {
                        cat.categoryProducts.sort(function (a: ProductDetail, b: ProductDetail) { return a.price - b.price })
                    }
                    if (sort === 'mayorRating') {
                        cat.categoryProducts.sort(function (a: ProductDetail, b: ProductDetail) { return b.rating - a.rating })
                    }
                })
                dispatch({
                    type: GET_CATEGORIES,
                    payload: resp
                })

            })
    }
}

export const createProduct = function (input: CardForm) {
    return function (dispatch: Dispatch<Action>) {
        axios.post('http://localhost:3001/product', input)
            .then(res => console.log(res.data))
            .catch(error => console.log(error))
    }
}

export const getFoodById = (id: string) => {
    return function (dispatch: Dispatch<Action>) {
        axios(`http://localhost:3001/product/${id}`).then(resp => resp.data)
            .then(resp => {
                dispatch({
                    type: GET_FOOD_BY_ID,
                    payload: resp
                })
            })
    }
}


// export const fillFormData = (input: CardForm) => {
//     return function (dispatch: Dispatch<Action>) {
//         dispatch({
//             type: EDIT_FORM,
//             payload: input
//         })
//     }
// }


// PRODUCTS

export const vaciarComida = function () {
    return function (dispatch: Dispatch<Action>) {
        dispatch({
            type: EMPTY_FOOD,
        })
    }
}

export const editProduct = (input: CardForm, id: number) => {
    return function (dispatch: Dispatch<Action>) {
        axios.put(`http://localhost:3001/product/${id}`, input).then(res => res.data)
            .then(resp => {
                console.log(resp)
            })
            .catch(err => console.log(err))
    }
}

export const deleteProduct = (id: string) => {
    axios.delete(`http://localhost:3001/product/${id}`).then(res => res.data)
        .then(res => console.log(res))
        .then(res => window.location.reload())
        .catch(err => console.log(err))
}

export function actualizarCart(food: any) {
    return {
        type: ACTUALIZAR_CART,
        payload: food
    }
}

export function addToCart(food: any) {
    return {
        type: ADD_TO_CART,
        payload: food
    }
}

export function deleteItemFromCart(id: any) {
    return {
        type: DELETE_FOR_CART,
        payload: id
    }
}


//NODEMAILER:

export const sendSubscribeMail = (mail: String) => {
    if (mail) {
        return function (dispatch: Dispatch<Action>) {
            axios.post(`http://localhost:3001/sendSubscribeMail/${mail}`)
                .then(res => res.data)
                .then(res => alert(`Gracias por suscribirte a Henry's Food`))
                .catch(err => console.log(err))
        }
    } else {
        console.log(`didn't get email`)
    }
}

export const sendResetPassMail = (mail: String) => {
    if (mail) {
        return function (dispatch: Dispatch<Action>) {
            axios.post(`http://localhost:3001/sendRecuperaContra/${mail}`)
                .then(res => res.data)
                .then(res => alert('Revisa tu casilla de correo'))
                .catch(err => console.log(err))
        }
    } else {
        console.log(`didn't get mail`)
    }
}



//USERS:

export const changeBanUser = (id: any) => {
    return async function (dispatch: Dispatch<Action>) {
        if (id) {
            try {
                axios.put(`http://localhost:3001/banUser/${id}`)
                    .then(res => {
                        alert('Usuario Baneado')
                    })

            } catch (error) {
                console.log(error)
            }
        }
        else {
            console.log(`didn't get id`)
        }
    }
}

export const changeUserAsAdmin = (id: any) => {
    return async function (dispatch: Dispatch<Action>) {
        if (id) {
            try {
                axios.put(`http://localhost:3001/setAdmin/${id}`)
                    .then(res => {
                        alert('El usuario es ahora administrador')
                    })

            } catch (error) {
                console.log(error)
            }
        }
        else {
            console.log(`didn't get id`)
        }
    }
}

export const changeNoBanUser = (id: any) => {
    return async function (dispatch: Dispatch<Action>) {
        if (id) {
            try {
                axios.put(`http://localhost:3001/noBanUser/${id}`)
                    .then(res => alert('El usuario ya no está baneado'))

            } catch (error) {
                console.log(error)
            }
        }
        else {
            console.log(`didn't get id`)
        }
    }
}

export const getAllUsers = () => {
    return async function (dispatch: Dispatch<Action>) {
        try {
            const users = await axios.get('http://localhost:3001/user')
            return dispatch({ type: GET_ALL_USERS, payload: users.data })
        } catch (error) {
            console.log(error)
        }

    }
}

export const editUser = (id: String, input: any) => {
    return function (dispatch: Dispatch<Action>) {
        axios.put(`http://localhost:3001/user/${id}`, input)
            .then(res => {
                alert('Su contraseña fue modificada correctamente')
            })
            .catch(err => console.log(err))
    }
}


export const createUser = (input: any, navigate: any) => {

    return function (dispatch: Dispatch<Action>) {
        axios.post(`http://localhost:3001/user/register`, input).then(resp => resp.data)
            .then(res => {
                console.log('registrado', res)
                alert('Registrado correctamente')
                axios.post(`http://localhost:3001/sendWelcomeMail/${input.mail}`).then(res => console.log('email sent', res.data))
                navigate('/pedidos')
            })
            .catch(err => {
                return dispatch({
                    type: ERROR_HANDLER,
                    payload: err
                })
            })
    }
}
export const logUser = (navigate: any, input: { mail: string, password: string }) => {
    return function (dispatch: Dispatch<Action>) {
        axios.post(`http://localhost:3001/user/login`, input).then(resp => resp.data)
            .then(res => {
                console.log('loggeado', res)
                alert('inicio de sesion correcto')
                localStorage.setItem('token', JSON.stringify(res));
                window.location.reload()
                navigate('/pedidos')
            })
            .catch(err => {
                return dispatch({
                    type: ERROR_HANDLER,
                    payload: err

                })
            })
    }
}

export const getUserById = (id: String) => {
    return function (dispatch: Dispatch<Action>) {
        axios(`http://localhost:3001/user/${id}`).then(resp => resp.data)
            .then(resp => {
                dispatch({
                    type: GET_USER_BY_ID,
                    payload: resp
                })
            })
    }
}


export const cleanError = () => {
    return function (dispatch: Dispatch<Action>) {
        dispatch({
            type: CLEAN_ERROR
        })
    }
}


export const modifyItemFromStock = (newStock: any, id: string) => {
    return function (dispatch: Dispatch<Action>) {
        axios.put(`http://localhost:3001/product/${id}`, newStock).then(res => res.data)
            .then(resp => {
                console.log(resp)
            })
            .catch(err => console.log(err))
    }
}

export const getUser = (token: { auth: boolean, token: string }) => {
    return function (dispatch: Dispatch<Action>) {
        axios
            .get("http://localhost:3001/user/token", {
                headers: {
                    "x-access-token": token.token,
                },
            })
            .then((res) => {
                dispatch({
                    type: GET_USER,
                    payload: res.data
                })
            })
            .catch((err) => {
                dispatch({
                    type: ERROR_HANDLER,
                    payload: err
                })
            });
    }
}

export function modificarUser(_id: string, payload: any) {
    return function () {
        axios.put(`http://localhost:3001/user/${_id}`, payload)
    }
}