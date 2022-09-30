import { GET_CATEGORIES, GET_PRODUCTS, GET_PRODUCTS_BY_NAME } from "../actions";

const initialState:any = {
    backup: [],
    products: [],
    categories: []
  }
  
  
  export default function rootReducer(state = initialState, action:any) {
      switch(action.type){

        case GET_PRODUCTS:
            return {
                ...state,
                backup: action.payload,
                products: action.payload
            }
        case GET_PRODUCTS_BY_NAME: 
            return{
                ...state,
                products: action.payload
            }
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }
          default:
              return state;
      }
  }