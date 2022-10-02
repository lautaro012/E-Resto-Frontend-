import { Dispatch, SetStateAction } from "react";


export interface CardProp { 
    name: string, 
    img: string, 
    price: number, 
    description: string,
    off: number,
}

export interface CardForm extends CardProp{
    stock: number,
    rating: number,
    category: string,
    newProduct?: boolean
}

export interface NavBarProp {
    comeback: Boolean
    setcreateProduct: Dispatch<SetStateAction<Boolean>>
    seteditProduct: Dispatch<SetStateAction<Boolean>>
}