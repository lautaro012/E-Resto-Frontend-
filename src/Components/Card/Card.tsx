import { Link } from "react-router-dom";
interface CardProp { name: string, image: string, price: number, description: string }

export default function Card({ name, image, price, description }: CardProp) {

    return (
        // <div className="card2">
        //     <img src={image} alt={name} width="200" height="150" />
        //     <Link to={'/pedidos/' + name}>
        //         <h3>{name}</h3>
        //     </Link>
        //     <h5>$ {price}</h5>
        // </div>
        <section className="section">
            <div className="container">
                <div className="grid">
                    <article className="card">
                        <img className="card__image" src={image} alt={name} width="200" height="200"/>
                        <div className="card__data">
                            <div className="card__info">
                                <h2>{name}</h2>
                                <p>{description}</p>
                            </div>
                            <h3 className="card__price">$ {price}</h3>
                            <button className="card__add">+</button>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    )
}