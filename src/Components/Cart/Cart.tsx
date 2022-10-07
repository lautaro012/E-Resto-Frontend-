import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../config'
import { deleteItemFromCart, getProducts } from "../../redux/actions";
import { Link } from "react-router-dom";
import '../Cart/Cart.css'
import ContadorLs from "./ContadorLs";
import { FooterBrand } from "flowbite-react/lib/esm/components/Footer/FooterBrand";
import PrettyRating from "pretty-rating-react";
import { Button } from "flowbite-react";

export default function Cart() {

    const dispatch = useAppDispatch()
    const items = useAppSelector((state) => state.cart)

    const [render, setRender] = useState<string>("")

    useEffect(() => {
        dispatch(getProducts("AZ"))
        if (items.length === 0) {
            let total = 0
            localStorage.setItem("products", JSON.stringify(items));
            localStorage.setItem("precioTotal", JSON.stringify(total));
        }
    }, [dispatch, items]);

    function deleteItem(id: any) {
        dispatch(deleteItemFromCart(id))
    }

    function handdleCantidad(cantidad: number, id: string) {

        setRender(`${id + cantidad}`) // este numero no tiene sentido, es solo para renderizar ante cualquier cambio

        let itemFound = items.find((itemToModify: any) => itemToModify._id === id)

        itemFound.cantidad = cantidad
    }


    const colors = {
        star: ['#d9ad26', '#d9ad26', '#434b4d'],
    }

    return (
        <div className="contenedor_total_carrito">
            {
                items && items.length ?
                    <div id="conteinerCart">
                        <div id="conteinerCart_left">
                            {
                                items && items?.map((item: any) => {
                                    console.log(item)
                                    return (
                                        <figure className="food">
                                            <div className="food__hero">
                                                <img src={item.img} alt={item.name} className="food__img" />
                                            </div>
                                            <div className="food__content">
                                                <div className="food__title">
                                                    <h1 className="food__heading">{item.name}</h1>
                                                    <div className="food__tag food__tag--1">{item.category}</div>
                                                </div>

                                                {
                                                    item.comentario && item.comentario ?
                                                        item.comentario !== "" ?
                                                            <p className="food__description">{item.comentario}</p>
                                                            :
                                                            <p className="food__description">Sin comentarios para la orden</p>
                                                        :
                                                        <p className="food__description">{item.description}</p>
                                                }

                                                <div className="food__details">
                                                    <p className="food__detail"><span className="emoji">⭐️</span>{item.rating}</p>
                                                    <PrettyRating value={item.rating} colors={colors.star} />
                                                    <button className="food__detail" onClick={() => { if (window.confirm(`Esta seguro que quiere eliminar ${item.name} de su carrito ?`)) deleteItem(item._id) }}>
                                                        <span className="emoji">🗑</span>
                                                    </button>
                                                </div>

                                                <div className="Label">
                                                    <label>Cantidad</label>
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
                                                        value={item.cantidad}
                                                        name='cantidad'
                                                        min="1" max="10"
                                                        onChange={(event) => handdleCantidad(Number(event.target.value), item._id)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="food__price">$ {item.price}</div>
                                        </figure>
                                    )
                                })
                            }
                        </div>
                        <div id="conteinerCart_right">
                            <ContadorLs
                                render={render}
                            ></ContadorLs>
                            <Button id="vaciar_carrito" gradientMonochrome="failure" onClick={() => { if (window.confirm("Esta seguro de vaciar su carrito ?")) deleteItem("All") }}>Vaciar carrito</Button>
                        </div>
                    </div>
                    :
                    <div id="no_foods_cart">
                        <h1 className="text-m font-semibold tracking-tight text-gray-900 dark:text-white">No hay pedidos en tu carrito</h1>
                    </div>
            }
        </div>
    )
}