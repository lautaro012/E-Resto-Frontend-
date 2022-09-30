import { current } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import '../Card/Card.css'

export default function Card(comidaProps: any) {

    let { _id, price, off, description, name, img } = comidaProps.comidaProps

    let currentprice = price - (price * off / 100)

    return (
        <section className="section">
            <div className="container">
                <div className="grid">
                    <article className="card">
                        <Link to={`/product/${_id}`}>
                            <img className="card__image" src={img} alt={name} width="200" height="200" />
                        </Link>
                        <div className="card__data">
                            <div className="card__info">
                                <Link to={`/product/${_id}`}>
                                    <h2>{name}</h2>
                                </Link>
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