import axios from "axios"
import { useState } from "react"
import { buttonclass } from "../../Style/Clases/Clases"
import './OrderDelivery.css'


export default function OrderDelivery ({delivery, detalles}:any) {
    const [loading, setLoading] = useState(false)

    const deli_id = {
        deli_id: delivery
    }


    const handleDelivered = (e:any) => {
        setLoading(true)
        axios.put(`/order/delivered/${e.target.value}`, deli_id )
        .then(res => {
            console.log(res);
            return res.data
        })
        .then(res => {
            setLoading(false)
            console.log(res)
            window.location.reload()
        })
        .catch(err => {
            setLoading(false)
            console.log(err)
        })
    }
    console.log(detalles)

    return (
        <div className="orden-details-conteiner">
                                {
                                    detalles.length ?
                                    detalles.map((orden:any) => {
                                        if(!orden.delivered) {
                                            return(
                                                <div className="delivery-details-order">    
                                                    <h1> Detalles del pedido </h1>
                                                <div className="detail-price-conteiner">
                                                {
                                                orden?.items.map((item: any) => {
                                                    return (
                                                        <div className="asdasd">
                                                            <img width={60} src={item.img} alt='alt'></img>
                                                            <h2>{item.cantidad}</h2>
                                                            <h2>{item.name}</h2>
                                                            <p> $ {item.price} </p>
                                                        </div>
                                                    )
                                                })
                                                }
                                                </div>
                                                <br />
                                                <h1>Resumen</h1>
                                                <div className="resumen-conteiner">
                                                    <div className="resumen-precios">
                                                        <span><h2>Subtotal </h2><h2>${orden.subtotal}</h2></span>
                                                        <span><h2>Propina </h2><h2>${orden.propina}</h2></span>
                                                        <span><h2><strong>Total </strong></h2><h2>${orden.total}</h2></span>
                                                    </div>
                                                </div>
                                                <br />
                                                <h3>Detalles de la entrega:</h3>
                                                {
                                                    orden.user.length ?
                                                    <div className="timer-conteiner">
                                                        <h1><strong>Para:</strong> {orden.user[0].name} {orden.user[0].lastName}</h1>
                                                        <h1><strong>Direccion:</strong> {orden.user[0].adress}</h1>
                                                        <h1><strong>Horario:</strong> {orden.date.slice(11, -5)}</h1>
                                                    </div>
                                                     :
                                                    null
                                                }
                                                <br></br>
                                                <div className="timeline-buttons">
                                                {
                                                    loading ?
                                                    <button disabled className={buttonclass}> Cargando </button>
                                                    :
                                                    <button value={orden._id} onClick={e => handleDelivered(e)} className={buttonclass}> Pedido Entregado </button>
                                                }
                                                </div>
                                                <br />
                                                </div>
                                            )
                                        }
                                        return null
                                    })
                                    :
                                    <h1>No Posee ninguna orden asignada</h1>
                                }
                        </div>
    )
}