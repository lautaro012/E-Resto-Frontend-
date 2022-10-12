import { Dispatch, SetStateAction } from "react";

export interface FoodCard {
    name: string,
    img: string,
    price: number,
    description: string,
    off: number,
}

export interface CardForm extends FoodCard {
    stock: number,
    rating: number,
    category: string,
    newProduct?: boolean
}

export interface ProductDetail extends CardForm {
    _id: string
}

export interface NavBarProp {
}

export interface CardProp {
    formCard?: boolean,
    comidaProps: ProductDetail | CardForm,
    onProducEdit?: (input: CardForm) => void,
    modalOpen?: Dispatch<SetStateAction<boolean | undefined>>,
    setIdModal?: Dispatch<SetStateAction<string | undefined>>
}

export interface Category {
    name: string,
    _id: string,
    categoryProducts: Array<ProductDetail>
}

export type StateTypes = {

    products: ProductDetail[] | [],
    categories: Array<Category> | [],
    detail: ProductDetail | [],
    cart: ProductDetail[] | [],
    userDetail: [],
    allUsers: [],
    error: any,
    user: any,
}

export type Action = {
    type: string;
    payload?: any;
};

export type Select = React.ChangeEvent<HTMLSelectElement>
export type Submit = React.FormEvent<HTMLFormElement>
export type Input = React.ChangeEvent<HTMLInputElement>
export type TextArea = React.ChangeEvent<HTMLTextAreaElement>