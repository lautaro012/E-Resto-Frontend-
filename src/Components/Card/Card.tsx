import { Link } from "react-router-dom";
interface CardProp { name: string , image: string, price: number}

export default function Card({ name , image, price } : CardProp) {

    return (
        <div className="card">
            <Link to={'/recipe/' + name}>
                <h3>{name}</h3>
            </Link>
            <img src={image} alt={name} width="300" height="150" />
            <h5>$ {price}</h5>
        </div>
    )
}