import { Button, Modal } from 'flowbite-react'
import { ModalBody } from 'flowbite-react/lib/esm/components/Modal/ModalBody'
import { ModalFooter } from 'flowbite-react/lib/esm/components/Modal/ModalFooter'
import { ModalHeader } from 'flowbite-react/lib/esm/components/Modal/ModalHeader'
import { useAppDispatch, useAppSelector } from '../../../config'
import { useState, useEffect } from "react";
import './Orders.css'
import DetailOrder from './DetailOrder/DetailOrder'
import { getUser } from '../../../redux/actions'

export default function Orders({ handleRender }: any) {

    const user = useAppSelector(state => state.user)

    const [calificacion, setCalificacion] = useState<boolean>(false)

    const [orderId, setOrderId] = useState<object>()
    const dispatch = useAppDispatch()

    function closeCalificacion() {
        setCalificacion(false)
    }

    function handleOrderDatailModal(order: any) {
        setOrderId(order)
        setCalificacion(true)
    }
    const handleOrderDetail = (e: any) => {
        handleRender('detail', e)
    }

    const token = JSON.parse(localStorage.getItem("token")!);
    useEffect(() => {
        dispatch(getUser(token))
    }, [])


    return (
        <div className='main_conteiner_order' data-aos="fade-left" data-aos-duration="500">
            <h1 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">Mis compras</h1>
            {
                user.orders && user.orders.length > 0 ?
                    user.orders.map((order: any) => {
                        return (
                            <div id="conteiner_order" key={order.date}>
                                <div id='estado_order_coteiner'>
                                    {
                                        order.delivered === true ?
                                            <span>🟢 Entregado</span>
                                            :
                                            <span>🔵 En proceso</span>
                                    }
                                    {
                                        order.delivered === true ?
                                            <Button onClick={() => handleOrderDatailModal(order)}>Calificar</Button>
                                            :
                                            <Button value={order._id} name={order._id} onClick={(e) => handleOrderDetail(order._id)}>Seguimiento</Button>
                                    }
                                </div>
                                <h3 className="text-4l font-semibold tracking-tight text-gray-900 dark:text-white">Fecha</h3>
                                <p>{order.date.slice(0, 10)}</p>
                                <hr />
                                <h3 className="text-4l font-semibold tracking-tight text-gray-900 dark:text-white">Pago</h3>
                                <p>{order.payment}</p>
                                <hr />
                                <h3 className="text-4l font-semibold tracking-tight text-gray-900 dark:text-white">Total</h3>
                                <p>$ {order.total}</p>
                            </div>
                        )
                    })
                    :
                    <div>
                        <h3>No hiciste ninguna compra !</h3>
                    </div>
            }
            <Modal
                show={calificacion}
                onClose={closeCalificacion}
                size="6xl"
                data-aos="fade-right"
                data-aos-duration="500"
            >
                <ModalHeader>
                    Calificacion de tu pedido
                </ModalHeader>
                <ModalBody>
                    <DetailOrder
                        order={orderId}
                    ></DetailOrder>
                </ModalBody>
                <ModalFooter>
                    © 2022 Henry's Resto Project™
                </ModalFooter>
            </Modal>
        </div>
    )
}