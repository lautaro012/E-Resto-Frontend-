

export interface CardProp { 
    name: string, 
    img: string, 
    price: number, 
    description: string,
    off: number,
}

export interface CardForm extends CardProp{
    stock: 0,
    rating: 3,
    category: '',
}
