import { Link } from "react-router-dom";
import { useAppDispatch } from "../../config";
import { deleteProduct } from "../../redux/actions";
import '../Card/Card.css'

export default function Card({formCard=false, comidaProps, onProducEdit}: any) {
    let { _id, price, off, description, name, img } = comidaProps
    let dispatch = useAppDispatch()
    let currentprice = price - (price * off / 100)
    
    const handleEdit = () => {
        console.log(comidaProps, 'aca')
        onProducEdit(comidaProps)
    }

    const handleDelete = () => {
        dispatch(deleteProduct(_id))
    }
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
                        </div>
                    </article>
                </div>
            </div>
            {
                formCard ?
                null
                :
                <div className="card-buttons">
                <button onClick={handleEdit}>edit</button>
                <button onClick={handleDelete}>delete</button>
                </div>
            }
            
        </section>
    )
}