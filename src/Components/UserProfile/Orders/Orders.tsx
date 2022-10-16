import { Modal } from 'flowbite-react'
import { ModalBody } from 'flowbite-react/lib/esm/components/Modal/ModalBody'
import { ModalFooter } from 'flowbite-react/lib/esm/components/Modal/ModalFooter'
import { ModalHeader } from 'flowbite-react/lib/esm/components/Modal/ModalHeader'
import { useAppSelector } from '../../../config'
import { useState } from "react";
import './Orders.css'
import DetailOrder from './DetailOrder/DetailOrder'
import { buttonclass } from '../../../Style/Clases/Clases'

export default function Orders({ handleRender }: any) {

    const user = useAppSelector(state => state.user)
    const [calificacion, setCalificacion] = useState<boolean>(false)

    const [orderId, setOrderId] = useState<object>()

    function closeCalificacion() {
        setCalificacion(false)
    }

    function handleOrderDatailModal(order: any) {
        setOrderId(order)
        setCalificacion(true)
    }
    const handleOrderDetail = (e: any) => {
        handleRender('detail', e.target.value)
    }

    return (
        <div className='main_conteiner_order' data-aos="fade-left" data-aos-duration="1500">
            <h1 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">Mis compras</h1>
            {
                user.orders && user.orders.length > 0 ?
                    user.orders.map((order: any) => {
                        return (
                            <div id="conteiner_order" key={order.date}>

                                {
                                    order.delivered === true ?
                                        <span>🟢 Entregado</span>
                                        :
                                        <span>🔵 En proceso</span>
                                }
                                <h3 className="text-4l font-semibold tracking-tight text-gray-900 dark:text-white">Fecha</h3>
                                <p>{order.date}</p>
                                <hr />
                                <h3 className="text-4l font-semibold tracking-tight text-gray-900 dark:text-white">Pago</h3>
                                <p>{order.payment}</p>
                                <hr />
                                <h3 className="text-4l font-semibold tracking-tight text-gray-900 dark:text-white">Total</h3>
                                <p>$ {order.total}</p>
                                <hr />
                                {
                                    order.delivered === true ?
                                        <button onClick={() => handleOrderDatailModal(order)}>Calificar</button>
                                        :
                                        <button className={buttonclass} value={order._id} onClick={(e) => handleOrderDetail(e)}>Seguimiento</button>
                                }
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
            >
                <ModalHeader></ModalHeader>
                <ModalBody>
                    <DetailOrder
                        order={orderId}
                    ></DetailOrder>
                </ModalBody>
                <ModalFooter></ModalFooter>
            </Modal>
        </div>
    )
}