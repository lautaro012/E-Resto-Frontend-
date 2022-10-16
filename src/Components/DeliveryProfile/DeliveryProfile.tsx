import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../config'
import { getDelivery, getDeliveryByID } from '../../redux/actions'
import { buttonclass } from '../../Style/Clases/Clases'
import './DeliveryProfile.css'

export default function DeliveryProfile () {

    const [render, setRender] = useState('registeredUsers')

    const dispatch = useAppDispatch()

    const token = JSON.parse(localStorage.getItem("delivery")!)

    useEffect(() => {
        dispatch(getDeliveryByID(token?.find[0]?._id))
    }, [])

    let delivery = useAppSelector(state => state.deliveryProfile)
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
                            <button className={buttonclass}> Historial </button>
                        </div>
                    </aside>
                    <div className='order-delivery-conteiner'>
                        ORDEN SI HAY ALGUNA
                    </div>
                </div>
                :
                <h1>CARGANDO..</h1>
            }
        </div>
    )
}