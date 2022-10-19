import { Dispatch } from "react";
import axios from 'axios'
import { Action, CardForm, Category, ProductDetail } from "../../Interfaces/Interfaces";
import swal from "sweetalert";
import Swal from 'sweetalert2';
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
export const CLEAR_USER = 'CLEAR_USER'
export const GET_ORDER_ID = 'GET_ORDER_ID'
export const GET_ALL_ORDERS = 'GET_ALL_ORDERS'
export const GET_DELIVERY = 'GET_DELIVERY'
export const GET_DELIVERY_BY_ID = 'GET_DELIVERY_BY_ID'
export const CLEAN_ORDER = 'CLEAN_ORDER'
export const getProducts = (sort: String) => {

    return function (dispatch: Dispatch<Action>) {

        axios('/product').then(resp => resp.data)
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
            axios('/category').then(resp => resp.data)
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
            axios('/category').then(resp => resp.data)
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
        axios('/category').then(resp => resp.data)
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
        axios.post('/product', input)
            .then(res => swal({ title: "Producto creado correctamente" }))
            .catch(error => console.log(error))
    }
}

export const getFoodById = (id: string) => {
    return function (dispatch: Dispatch<Action>) {
        axios(`/product/${id}`).then(resp => resp.data)
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
        axios.put(`/product/${id}`, input).then(res => res.data)
            .then(resp => {
                console.log(resp)
            })
            .catch(err => console.log(err))
    }
}

export const deleteProduct = (id: string) => {
    return async function (dispatch: Dispatch<Action>) {
        if (id) {
            Swal.fire({
                title: '¿Estás seguro que deseas eliminar este producto?',
                text: "Ya no estará disponible en la tienda virtual",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonText: 'Cancelar',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, confirmar'
            }).then((result: any) => {
                if (result.isConfirmed) {
                    try {
                        axios.delete(`http://localhost:3001/product/${id}`)
                            .then(res => {
                                Swal.fire(
                                    'Listo!',
                                    'El producto ha sido eliminado correctamente',
                                    'success'
                                )
                                    .then((res: any) => window.location.reload())

                            })
                    } catch (error) {
                        console.log(error)
                    }
                }
            })
        }
        else {
            console.log(`didn't get id`)
        }
    }
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
            axios.post('/newsletter', { mail: mail })
                .then(
                    res => axios.post(`/sendSubscribeMail/${mail}`)
                ).then(res => res.data)
                .then(res => swal({ title: `Gracias por suscribirte a Henry's Food` }))
                .catch(err => swal({ title: `${err.response.data}` }))

        }
    } else {
        console.log(`didn't get email`)
    }
}

export const sendResetPassMail = (mail: String) => {
    if (mail) {
        return function (dispatch: Dispatch<Action>) {
            axios.post(`/sendRecuperaContra/${mail}`)
                .then(res => res.data)
                .then(res => swal({ title: 'Revisa tu casilla de correo' }))
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
            Swal.fire({
                title: '¿Estás seguro que deseas banear al usuario?',
                text: "Se le informará al usuario el cambio en su cuenta",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonText: 'Cancelar',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, confirmar'
            }).then((result: any) => {
                if (result.isConfirmed) {
                    try {
                        axios.put(`http://localhost:3001/banUser/${id}`)
                            .then(res => {
                                Swal.fire(
                                    'Listo!',
                                    'El usuario ha sido baneado correctamente',
                                    'success'
                                )

                            })
                    } catch (error) {
                        console.log(error)
                    }

                }
            })

        }
        else {
            console.log(`didn't get id`)
        }
    }
}

export const changeUserAsAdmin = (id: any) => {
    return async function (dispatch: Dispatch<Action>) {
        if (id) {
            Swal.fire({
                title: '¿Estás seguro que deseas convertir al usuario en administrador?',
                text: "Podrá modificar, agregar productos y administrar los usuarios",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonText: 'Cancelar',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, confirmar'
            }).then((result: any) => {
                if (result.isConfirmed) {
                    try {
                        axios.put(`http://localhost:3001/setAdmin/${id}`)
                            .then(res => {
                                Swal.fire(
                                    'Listo!',
                                    'El usuario es ahora administrador',
                                    'success'
                                )

                            })
                    } catch (error) {
                        console.log(error)
                    }

                }
            })
        }
        else {
            console.log(`didn't get id`)
        }
    }
}

export const changeNoBanUser = (id: any) => {
    return async function (dispatch: Dispatch<Action>) {
        if (id) {
            Swal.fire({
                title: '¿Estás seguro que deseas devolver la cuenta al usuario?',
                text: "Podrá acceder al sitio nuevamente",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonText: 'Cancelar',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, confirmar'
            }).then((result: any) => {
                if (result.isConfirmed) {
                    try {
                        axios.put(`http://localhost:3001/noBanUser/${id}`)
                            .then(res => {
                                Swal.fire(
                                    'Listo!',
                                    'El usuario ahora puede ingresar al sitio',
                                    'success'
                                )

                            })
                    } catch (error) {
                        console.log(error)
                    }

                }
            })
        }
        else {
            console.log(`didn't get id`)
        }
    }
}

export const getAllUsers = () => {
    return async function (dispatch: Dispatch<Action>) {
        try {
            const users = await axios.get('/user')
            return dispatch({ type: GET_ALL_USERS, payload: users.data })
        } catch (error) {
            console.log(error)
        }

    }
}

export const editUser = (id: String, input: any) => {
    return function (dispatch: Dispatch<Action>) {
        axios.put(`/user/${id}`, input)
            .then(res => {
                swal({ title: 'Su contraseña fue modificada correctamente' })
            })
            .catch(err => console.log(err))
    }
}


export const createUser = (input: any, navigate: any) => {

    return function (dispatch: Dispatch<Action>) {
        axios.post(`/user/register`, input).then(resp => resp.data)
            .then(res => {
                console.log('registrado', res)
                axios.post(`/sendWelcomeMail/${input.mail}`).then(res => console.log('email sent', res.data))
                swal({ title: 'Registrado correctamente' })
                //navigate('/pedidos')
            })
            .catch(err => {
                return dispatch({
                    type: ERROR_HANDLER,
                    payload: err
                })
            })
    }
}

export const clearUser = () => {
    return function (dispatch: Dispatch<Action>) {
        return dispatch({
            type: CLEAR_USER
        })
    }
}


export const logUser = (navigate: any, input: any) => {
    return function (dispatch: Dispatch<Action>) {
        axios.post(`/user/login`, input).then(resp => resp.data)
            .then(res => {
                localStorage.setItem('token', JSON.stringify(res));
                window.location.reload()
                //navigate('/pedidos')
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
        axios(`/user/${id}`).then(resp => resp.data)
            .then(resp => {
                dispatch({
                    type: GET_USER_BY_ID,
                    payload: resp
                })
            })
    }
}

export const getUser = (token: { auth: boolean, token: string }) => {
    return function (dispatch: Dispatch<Action>) {
        axios
            .get("/user/token", {
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
        axios.put(`/user/${_id}`, payload)
    }
}


// ERROR HANDLER
export const cleanError = () => {
    return function (dispatch: Dispatch<Action>) {
        dispatch({
            type: CLEAN_ERROR
        })
    }
}


export const modifyItemFromStock = (newStock: any, id: string) => {
    return function (dispatch: Dispatch<Action>) {
        axios.put(`/product/${id}`, newStock).then(res => res.data)
            .then(resp => {
                console.log(resp)
            })
            .catch(err => console.log(err))
    }
}

export function getAllOrders() {
    return function (dispatch: Dispatch<Action>) {
        axios.get('/order').then(res => res.data)
            .then(resp => {
                dispatch({
                    type: GET_ALL_ORDERS,
                    payload: resp
                })
            })
    }
}
export function createOrder(payload: any) {
    return function () {
        axios.post('/order', payload).then(res => res.data)
            .then(resp => {
                console.log(resp)
                // window.location.reload()
            })
            .catch(error => console.log(error))
    }
}
export function postReview(input: any) {
    return function () {
        axios.post('/review', input).then(res => res.data)
            .then(resp => {
                console.log(resp)
            })
            .catch(error => console.log(error))
    }
}

export function getOrdenByID(id: number) {
    return function (dispatch: Dispatch<Action>) {
        axios.get(`/order/${id}`).then(res => res.data)
            .then(res => {
                dispatch({
                    type: GET_ORDER_ID,
                    payload: res
                })
            })
    }
}

export function getDelivery() {
    return function (dispatch: Dispatch<Action>) {
        axios.get('/delivery').then(res => res.data)
            .then(res => {
                dispatch({
                    type: GET_DELIVERY,
                    payload: res
                })
            })
    }
}



export const createNewDelivery = (input: any) => {

    return function (dispatch: Dispatch<Action>) {
        if (input) {
            axios.post(`/delivery/register`, input).then(resp => resp.data)
                .then(res => {
                    console.log('registrado', res)
                    Swal.fire('Registrado correctamente')
                        .then((res) => { if (res.isConfirmed) window.location.reload() })
                })
                .catch(err => {
                    if (err.response.status === 400) {
                        swal('El mail ya está registrado')
                    }
                    if (err.response.status === 404) {
                        swal('Faltó ingresar datos requeridos')
                    }
                    else console.log(err)
                })
        } else { console.log(`didn't get input`) }
    }
}



export function getDeliveryByID(token: { auth: boolean, token: string }) {
    return function (dispatch: Dispatch<Action>) {
        axios
            .get("/delivery/token", {
                headers: {
                    "x-access-token": token.token,
                },
            })
            .then((res) => {
                dispatch({
                    type: GET_DELIVERY_BY_ID,
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

export function logDelivery(navigate: any, input: any) {
    return function (dispatch: Dispatch<Action>) {
        axios.post('/delivery/login', input).then(res => res.data)
            .then(res => {
                localStorage.setItem('delivery', JSON.stringify(res));
                window.location.reload()
            })
            .catch(err => {
                console.log(err.response.data)
                return dispatch({
                    type: ERROR_HANDLER,
                    payload: err.response.data
                })
            })
    }
}

export function asignOrder(id: number, deli_id: number) {
    return function (dispatch: Dispatch<Action>) {
        axios.put(`/order/add/${id}`, { deli_id }).then(res => res.data)
            .then(res => swal({ title: 'Pedido Asignado Exitosamente' }))
    }
}

export function getMailContact(input: any) {
    return function (dispatch: Dispatch<Action>) {
        axios.post('/contactMailing', input)
            .then(res => swal({ title: 'Hemos recibido tu consulta, te responderemos a la brevedad' }))
            .catch(res => swal({ title: 'No pudimos recibir el mail' }))
    }
}

export function cleanOrder() {
    return function (dispatch: Dispatch<Action>) {
        dispatch({
            type: CLEAN_ORDER
        })
    }
}