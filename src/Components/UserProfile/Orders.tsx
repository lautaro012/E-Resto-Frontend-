import { useAppSelector } from '../../config'
import './UserProfile.css'

export default function Orders() {

    const user = useAppSelector(state => state.user)

    return (
        <div className='main_conteiner_order'>
            <h1>Mis compras</h1>
            {
                user.orders && user.orders.length > 0 ?
                    user.orders.map((order: any) => {
                        return (
                            <div id="conteiner_order">
                                <h3>Fecha</h3>
                                <p>{order.date}</p>

                                <h3>Pago</h3>
                                <p>{order.payment}</p>

                                <h3>Pedidos</h3>
                                {
                                    order.items && order.items.map((food: any) => {
                                        return (
                                            <div id="conteinerCart_order">
                                                <h4>Producto</h4>
                                                <p>{food.name}</p>
                                                <h4>Precio</h4>
                                                <p>${food.price}</p>
                                                <img src={food.img} alt={food.name}></img>
                                                <h4>Cantidad</h4>
                                                <p>{food.cantidad}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                    :
                    <div>
                        <h3>No hiciste ninguna compra !</h3>
                    </div>
            }
        </div>
    )
}