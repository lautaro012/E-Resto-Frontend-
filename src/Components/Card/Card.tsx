import { current } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import { CardProp } from "../../Interfaces/Interfaces";

export default function Card({ name, image, price, description, off }: CardProp) {

    let currentprice = price - (price * off/100)
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
                            {
                                !off ?
                                <h3 className="card__price">$ {price}</h3>
                                :
                                <div className="off_price">
                                    <del><h3 className="card__price">$ {price}</h3></del>
                                    <div className="tag_off">
                                        <h3 className="card_price">{off}%</h3>
                                    </div>
                                    <h3 className="card_price"> $ {currentprice}</h3>
                                </div>
                            }
                            <button className="card__add">+</button>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    )
}