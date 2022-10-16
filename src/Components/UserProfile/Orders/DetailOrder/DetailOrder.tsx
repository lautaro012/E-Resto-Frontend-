import { Accordion } from "flowbite-react"
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../config";
import swal from "sweetalert";
import './DetailOrder.css'
import { postReview } from "../../../../redux/actions";

export default function DetailOrder({ order }: any) {

    let dispatch = useAppDispatch()

    const user = useAppSelector(state => state.user)
    //const [idComida, setIdComida] = useState<string>("")

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

    console.log("INPUT", input)

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

    return (
        <div>
            <Accordion>
                {
                    order && order.items.map((food: any) => {
                        return (
                            <Accordion.Panel >
                                <Accordion.Title >
                                    <div id="conteinerCard_order" key={food.name}>
                                        <p>{food.name}</p>
                                        <p>${food.price}</p>
                                        <p>{food.cantidad}</p>
                                        <img src={food.img} alt={food.name}></img>
                                    </div>
                                </Accordion.Title>
                                <Accordion.Content >
                                    <form onSubmit={(event) => handleSubmit(event)} className="Form_review">
                                        <div id="Label_review">
                                            <label>Comenta esta comida</label>
                                            <textarea id="comment"
                                                value={input.comment}
                                                name='comment'
                                                placeholder="Breve comentario sobre tu pedido..."
                                                rows={5} cols={55}
                                                onClick={(e) => handleIdComida(e, food._id)}
                                                onChange={(event) => handleInput(event)}
                                            />
                                            <label>Puntaje</label>
                                            <input
                                                type='number'
                                                className="
                                                        form-control
                                                        block
                                                        w-full
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
                                                onChange={(event) => handleInput(event)}
                                            />
                                        </div>
                                        <button id="submit" type="submit">Enviar calificacion</button>
                                    </form>
                                </Accordion.Content>
                            </Accordion.Panel>

                        )
                    })
                }
            </Accordion>
        </div>
    )
}
