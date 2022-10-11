import { useAppSelector } from '../../config'
import './UserProfile.css'

export default function Orders() {

    const user = useAppSelector(state => state.user)

    console.log(user)

    return (
        <div className='main_conteiner_order'>
            <h1 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">Mis compras</h1>
            {
                user.orders && user.orders.length > 0 ?
                    user.orders.map((order: any) => {
                        return (
                            <div id="conteiner_order">
                                <h3 className="text-4l font-semibold tracking-tight text-gray-900 dark:text-white">Fecha</h3>
                                <p>{order.date}</p>
                                <hr />
                                <h3 className="text-4l font-semibold tracking-tight text-gray-900 dark:text-white">Pago</h3>
                                <p>{order.payment}</p>
                                <hr />
                                <h3 className="text-4l font-semibold tracking-tight text-gray-900 dark:text-white">Total</h3>
                                <p>$ {order.subtotal}</p>
                                <hr />
                                <h3 className="text-4l font-semibold tracking-tight text-gray-900 dark:text-white">Pedidos</h3>
                                {
                                    order.items && order.items.map((food: any) => {
                                        return (
                                            <div id="conteinerCart_order">
                                                <p>{food.name}</p>
                                                <p>${food.price}</p>
                                                <img src={food.img} alt={food.name}></img>
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