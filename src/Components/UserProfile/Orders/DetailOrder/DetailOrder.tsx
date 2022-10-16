import { Accordion, Button } from "flowbite-react"
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../config";
import swal from "sweetalert";
import './DetailOrder.css'
import { postReview } from "../../../../redux/actions";

export default function DetailOrder({ order }: any) {

    let dispatch = useAppDispatch()

    const user = useAppSelector(state => state.user)

    const [input, setInput] = useState({
        user_id: user._id,
        product_id: "",
        rating: 1,
        comment: ""
    })

    function handleInput(event: any) {
        event.preventDefault()
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    }

    function handleIdComida(e: any, foodId: string) {
        e.preventDefault()
        setInput({
            ...input,
            product_id: foodId
        })
    }

    function handleSubmit(event: any) {
        event.preventDefault()
        dispatch(postReview(input))
        setInput({
            user_id: "",
            product_id: "",
            rating: 1,
            comment: ""
        })
        swal({ title: "Comentario enviado!" })
    }

    console.log("ORDER", order)

    return (
        <div className="conteiner_calificacion">
            <div className="conteiner_factura_detalles">
                {
                    order && order ?
                        <div className="details-order">
                            <h1> Detalles del pedido </h1>
                            <div className="detail-price-conteiner">
                                {
                                    order.items.map((item: any) => {
                                        return (
                                            <div className="asdasd">
                                                <img src={item.img} alt='alt'></img>
                                                <h2>{item.cantidad}</h2>
                                                <h2>{item.name}</h2>
                                                <p> $ {item.price} </p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <br />
                            <h1>Resumen</h1>
                            <div className="resumen-conteiner">
                                <div className="resumen-precios">
                                    <span><h2>Subtotal </h2><h2>${order.subtotal}</h2></span>
                                    <span><h2>Propina </h2><h2>${order.propina}</h2></span>
                                    <hr />
                                    <span><h2><strong>Total </strong></h2><h2>${order.total}</h2></span>
                                </div>
                            </div>
                            <br />
                            <h3>Detalles de la entrega:</h3>
                            <div className="timer-conteiner">
                                <h1><strong>Para:</strong> {user.name} {user.lastName}</h1>
                                <h1><strong>Direccion:</strong> {user.adress}</h1>
                                <h1><strong>Horario:</strong> {order.date.slice(11, -5)}</h1>
                            </div>

                            <br />
                        </div>
                        :
                        null
                }
            </div>
            <div className="conteiner_acordion">
                <Accordion>
                    {
                        order && order.items.map((food: any) => {
                            return (
                                <Accordion.Panel>
                                    <Accordion.Title>
                                        <div id="conteinerCard_order" key={food.naem}>
                                            <h1>{food.name}</h1>
                                            <img src={food.img} alt={food.name}></img>
                                        </div>
                                    </Accordion.Title>
                                    <Accordion.Content >
                                        <form onSubmit={(event) => handleSubmit(event)} className="Form_review_acordion">

                                            <textarea id="comment"
                                                value={input.comment}
                                                name='comment'
                                                placeholder="Breve comentario sobre tu pedido..."
                                                rows={5} cols={50}
                                                required
                                                onClick={(e) => handleIdComida(e, food._id)}
                                                onChange={(event) => handleInput(event)}
                                            />
                                            <label>Puntaje</label>
                                            <input
                                                type='number'
                                                className="
                                                        form-control
                                                        block
                                                        px-3
                                                        py-1.5
                                                        text-base
                                                        font-normal
                                                        text-gray-700
                                                        bg-white bg-clip-padding
                                                        border border-solid border-gray-300
                                                        rounded
                                                        transition
                                                        ease-in-out
                                                        m-0
                                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                                      "
                                                value={input.rating}
                                                name='rating'
                                                min="1" max="5"
                                                required
                                                onChange={(event) => handleInput(event)}
                                            />

                                            <Button id="submit" type="submit">Enviar calificacion</Button>
                                        </form>
                                    </Accordion.Content>
                                </Accordion.Panel>
                            )
                        })
                    }
                </Accordion>
            </div>
        </div>
    )
}
