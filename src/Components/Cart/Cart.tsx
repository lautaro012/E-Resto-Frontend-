import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../config'
import { deleteItemFromCart, getProducts } from "../../redux/actions";
import { Link } from "react-router-dom";
import '../Cart/Cart.css'
import ContadorLs from "./ContadorLs";

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

    return (
        <div className="contenedor_total_carrito">
            <h1>Bienvenido a tu carrito</h1>
            {
                items && items.length ?
                    <div id="conteinerCart">
                        <div>
                            {
                                items && items?.map((item: any) => {
                                    return (
                                        <div key={item._id} id='cart-item'>
                                            <div>
                                                <h1>Nombre</h1>
                                                <h2>{item.name}</h2>
                                                <h1>Precio</h1>
                                                <h2>${item.price}</h2>
                                            </div>
                                            <div className="Label">
                                                <label>Cantidad</label>
                                                <input
                                                    type='number'
                                                    value={item.cantidad}
                                                    name='cantidad'
                                                    min="1" max="10"
                                                    onChange={(event) => handdleCantidad(Number(event.target.value), item._id)}
                                                />
                                            </div>
                                            <button onClick={() => { if (window.confirm(`Esta seguro que quiere eliminar ${item.name} de su carrito ?`)) deleteItem(item._id) }}>🗑</button>
                                        </div>
                                    )
                                })
                            }
                            <button onClick={() => { if (window.confirm("Esta seguro de vaciar su carrito ?")) deleteItem("All") }}>Vaciar carrito</button>
                        </div>
                        <ContadorLs
                            render={render}
                        ></ContadorLs>
                    </div>

                    :
                    <div id="no_foods_cart">
                        <h1>No hay pedidos en tu carrito</h1>
                    </div>
            }
            <Link to={"/pedidos"}>VOLVER</Link>
        </div>
    )
}