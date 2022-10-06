import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../config'
import { addToCart, deleteItemFromCart } from "../../redux/actions";
import { Link } from "react-router-dom";
//import { useNavigate } from "react-router-dom";
import '../Cart/Cart.css'

export default function Cart() {

    const dispatch = useAppDispatch()
    //  const navigate = useNavigate();
    const items = useAppSelector((state) => state.cart)

    const [propina, setPropina] = useState<number>(0);


    function deleteItem(id: any) {
        dispatch(deleteItemFromCart(id))
    }

    function handdleCantidad(cantidad: number, item: any, event: any) {

        console.log("CANTIDAD",cantidad)
        console.log("ITEM",item)
        //event.preventDefault()

        //CAMBIA TODO EL TIEMPO EL COMPONENTE PORQUE CAMBIA ITEMS, USAR ALGUN ESTADO LOCAL PARA QUE NO PASE ESO, OJO LOCAL STORAGE
        deleteItem(item._id)
        dispatch(addToCart({
            ...item,
            cantidad : cantidad
        }))
    }

    let subTotal = 0;
    for (let i = 0; i < items.length; i++) {

        subTotal += items[i].price * items[i].cantidad

    }

    let total = subTotal + propina


    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(items));
        localStorage.setItem("precioTotal", JSON.stringify(total));
    }, [items, total]);

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
                                                <h1>Cantidad</h1>
                                                <h2>{item.cantidad}</h2>
                                            </div>
                                            <div className="Label">
                                                <label>Cantidad</label>
                                                <input
                                                    type='number'
                                                    value={item.cantidad}
                                                    name='cantidad'
                                                    min="1" max="10"
                                                    onChange={(event) => handdleCantidad(Number(event.target.value), item, event)}
                                                />
                                            </div>
                                            <button onClick={() => { if (window.confirm(`Esta seguro que quiere eliminar ${item.name} de su carrito ?`)) deleteItem(item._id) }}>🗑</button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div id="conteiner_propinas">
                            <h1>Propina ? (Sin ellos, su envio no seria posible)</h1>
                            <button onClick={() => setPropina(50)}>$50</button>
                            <button onClick={() => setPropina(100)}>$100</button>
                            <button onClick={() => setPropina(150)}>$150</button>
                            <button onClick={() => setPropina(200)}>$200</button>
                            <div className="Label">
                                <label>Otro monto : $</label>
                                <input
                                    type='number'
                                    value={propina}
                                    name='propina'
                                    min="0" max={items.price}
                                    onChange={(event) => setPropina(Number(event.target.value))}
                                />
                            </div>
                        </div>
                        <div id="caja">
                            <button onClick={() => { if (window.confirm("Esta seguro de vaciar su carrito ?")) deleteItem("All") }}>Vaciar carrito</button>
                            <h2>Sub total : ${subTotal}</h2>
                            <h2>Propina : ${propina}</h2>
                            <h1>Total : ${total}</h1>
                            <button>Hacer pedido ya !</button>
                            {/* <Link to={"/cart/formularioPago"}><button onClick={(event) => handleBuy(event)}>Buy now !</button></Link> */}
                        </div>
                    </div>

                    :
                    <div id="no_games_cart">
                        <h1>No hay pedidos en tu carrito</h1>
                    </div>
            }
            <Link to={"/pedidos"}>VOLVER</Link>
        </div>
    )
}