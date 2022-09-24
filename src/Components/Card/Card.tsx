import { Link } from "react-router-dom";
interface CardProp { name: string, image: string, price: number }

export default function Card({ name, image, price }: CardProp) {

    return (
        <div className="card">
            <img src={image} alt={name} width="200" height="150" />
            <Link to={'/pedidos/' + name}>
                <h3>{name}</h3>
            </Link>
            <h5>$ {price}</h5>
        </div>
    )
}