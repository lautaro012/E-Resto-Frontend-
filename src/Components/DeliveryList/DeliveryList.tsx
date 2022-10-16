import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../config"
import { StateTypes } from "../../Interfaces/Interfaces"
import { getDelivery } from "../../redux/actions"


export default function DeliveryList () {

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getDelivery())
    }, [])

    let delivery = useAppSelector((state: StateTypes) => state.delivery);
    console.log(delivery)
    return (
        <div>
        {
            delivery.map((del:any) => {
                if(!del.ocupado) {
                    return (
                        <div>
                            <img width={60} alt='asdf' src='https://citizengo.org/sites/default/files/images/test_3.png'></img>
                            <h1>{del.name} {del.lastName}</h1>
                            <h2>{del.mail}</h2>
                        </div>
                    )
                }
                return null
            })
        }
        </div>
    )
}