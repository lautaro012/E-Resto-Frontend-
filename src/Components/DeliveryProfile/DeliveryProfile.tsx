import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../config'
import { StateTypes } from '../../Interfaces/Interfaces'
import { getDelivery, getDeliveryByID, getOrdenByID } from '../../redux/actions'
import { buttonclass } from '../../Style/Clases/Clases'
import Greencheck from '../../Style/images/icons8-checkmark-40.png'
import Redcheck from '../../Style/images/red-check.png'
import OrderDelivery from '../OrderDelivery/OrderDelivery'
import './DeliveryProfile.css'

export default function DeliveryProfile () {

    const [render, setRender] = useState('registeredUsers')

    const dispatch = useAppDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        dispatch(getOrdenByID(delivery?.orders[0]))
    }, [])

    let detalles = useAppSelector((state: StateTypes) => state.ordenDetail);
    console.log(detalles)


    let delivery = useAppSelector(state => state.deliveryProfile)
    console.log(delivery)

    const handleLogout = () => {
        localStorage.setItem("delivery", JSON.stringify([]))
        navigate('/home')
    }

    return (
        <div className="delivery-conteiner">
            {
                delivery ?
                <div className='delivery-profile-conteiner'>
                    <aside className='aside-delivery-conteiner'>
                        <div>
                            <img width={400} alt='asd' src={delivery.img}></img>
                            <span>{delivery.name} {delivery.lastName}</span>
                            <br></br>
                            <button className={buttonclass}> Pedido Actual </button>
                            <br></br>
                            <button className={buttonclass}> Historial de Pedidos </button>
                            <br></br>
                            <button onClick={handleLogout} className={buttonclass}> Cerrar Sesion </button>
                        </div>
                    </aside>
                    <div className='order-delivery-conteiner'>
                        {
                            detalles.length ?
                            <OrderDelivery detalles={detalles}></OrderDelivery>
                        :
                        <h1>Cargando..</h1>
                        }
                    </div>
                </div>
                :
                <h1>CARGANDO..</h1>
            }
        </div>
    )
}