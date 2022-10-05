import { Action, Category, ProductDetail, StateTypes } from "../../Interfaces/Interfaces";
import {
    GET_CATEGORIES,
    GET_PRODUCTS,
    GET_PRODUCTS_BY_NAME,
    GET_FOOD_BY_ID,
    EMPTY_FOOD,
    EDIT_FORM,
    ERROR_HANDLER,
    CLEAN_ERROR,
} from "../actions";

const initialState: StateTypes = {
    backup: [],
    products: [],
    categories: [],
    detail: [],
    allcategories: [],
    error: ''
}


export default function rootReducer(state = initialState, action: Action) {
    switch (action.type) {

        case GET_PRODUCTS:
            return {
                ...state,
                backup: action.payload,
                products: action.payload
            }
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
            }
        case GET_PRODUCTS_BY_NAME:
            let categorias = action.payload.res
            let Productosfiltrados = categorias.map((producto:Category) => {
                producto.categoryProducts = producto.categoryProducts.filter((data:ProductDetail) => data.name.toLowerCase().includes(action.payload.name.toLowerCase()))
                return producto
            })
            
            return {
                ...state,
                categories: Productosfiltrados
            }
        case GET_FOOD_BY_ID:
            return {
                ...state,
                detail: action.payload
            }
        case EMPTY_FOOD:
            return {
                ...state,
                detail: []
            }
        case EDIT_FORM:
            return {
                ...state,
                FormData: action.payload
            }
        case ERROR_HANDLER:
            return {
                ...state,
                error: action.payload
            }
        case CLEAN_ERROR:
            return {
                ...state,
                error: ''
            }
        default:
            return state;
    }
}