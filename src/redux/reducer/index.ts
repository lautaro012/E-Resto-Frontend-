import {
    GET_CATEGORIES,
    GET_PRODUCTS,
    GET_PRODUCTS_BY_NAME,
    GET_FOOD_BY_ID,
    EMPTY_FOOD,
} from "../actions";

const initialState: any = {
    backup: [],
    products: [],
    categories: [],
    detail: []
}


export default function rootReducer(state = initialState, action: any) {
    switch (action.type) {

        case GET_PRODUCTS:
            return {
                ...state,
                backup: action.payload,
                products: action.payload
            }
        case GET_PRODUCTS_BY_NAME:
            return {
                ...state,
                products: action.payload
            }
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
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
        default:
            return state;
    }
}