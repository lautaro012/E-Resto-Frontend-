import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../config"
import { StateTypes } from "../../Interfaces/Interfaces"
import { asignOrder, getAllOrders, getDelivery } from "../../redux/actions"
import { buttonclass } from "../../Style/Clases/Clases"
import './DeliveryList.css'

export default function DeliveryList ({handleCloseRepartidores, id}:{handleCloseRepartidores:any, id:number}) {

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getDelivery())
    }, [])

    let delivery = useAppSelector((state: StateTypes) => state.delivery);


    const handleAsign = (e:any) => {
        dispatch(asignOrder(id, e.target.value))
        handleCloseRepartidores()
        dispatch(getAllOrders())
    }

    return (
        <div>
        {
            delivery.map((del:any) => {
                if(!del.ocupado) {
                    return (
                        <div key={del._id}>
                        <div className="deliverylist-conteiner">
                            <img width={60} alt='asdf' src='https://citizengo.org/sites/default/files/images/test_3.png'></img>
                            <h1>{del.name} {del.lastName}</h1>
                            <h2>{del.mail}</h2>
                            <button value={del._id} onClick={handleAsign} className={buttonclass}> Asignar </button>
                        </div>
                        <br></br>
                        </div>
                    )
                }
                return null
            })
        }
        </div>
    )
}