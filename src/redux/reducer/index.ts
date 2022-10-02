import {
    GET_CATEGORIES,
    GET_PRODUCTS,
    GET_PRODUCTS_BY_NAME,
    GET_FOOD_BY_ID,
    EMPTY_FOOD,
    EDIT_FORM,
} from "../actions";

const initialState: any = {
    backup: [],
    products: [],
    categories: [],
    detail: [],
    allcategories: [],
    formData: {
        __id: undefined,
        name: 'test',
        img: 'https://citizengo.org/sites/default/files/images/test_3.png',
        price: 0,
        description: 'test-description',
        off: 0,
        stock: 0,
        rating: 3,
        category: '',
        newProduct: true
    }
}


export default function rootReducer(state = initialState, action: any) {
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
                allcategories: action.payload
            }
        case GET_PRODUCTS_BY_NAME:
            const allcategories = state.allcategories
            allcategories.map((product:any) => {
                let newfilter = product.categoryProducts.filter((el:any) => el.name.toLowerCase().includes(action.payload.toLowerCase()))
                state.categories.categoryProducts = newfilter
            })
            return {
                ...state
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
        default:
            return state;
    }
}