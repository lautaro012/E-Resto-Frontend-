import axios from "axios"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../config"
import { getUserById } from "../../redux/actions"
import { buttonclass } from "../../Style/Clases/Clases"
import swal from "sweetalert";


export default function OrderDelivery ({delivery, detalles}:any) {
    const [loading, setLoading] = useState(false)

    const deli_id = {
        deli_id: delivery
    }
    console.log(detalles)
    const handleDelivered = () => {
        setLoading(true)
        axios.put(`/order/delivered/${detalles[0]._id}`, deli_id )
        .then(res => {
            console.log(res);
            return res.data
        })
        .then(res => {
            setLoading(false)
            console.log(res)
            swal({ title: "Pedido entregado correctamente" })
        })
        .catch(err => {
            setLoading(false)
            console.log(err)
        })
    
    }

    return (
        <div className="orden-details-conteiner">
                                {
                                    detalles.length ?
                                    <div className="details-order">
                                        <h1> Detalles del pedido </h1>
                                        <div className="detail-price-conteiner">
                                            {
                                                detalles[0]?.items.map((item: any) => {
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
                                                <span><h2>Subtotal </h2><h2>${detalles[0].subtotal}</h2></span>
                                                <span><h2>Propina </h2><h2>${detalles[0].propina}</h2></span>
                                                <span><h2><strong>Total </strong></h2><h2>${detalles[0].total}</h2></span>
                                            </div>
                                        </div>
                                        <br />
                                        <h3>Detalles de la entrega:</h3>
                                        {
                                            detalles[0].user ?
                                                <div className="timer-conteiner">
                                                    <h1><strong>Para:</strong> {detalles[0].user[0].name} {detalles[0].user[0].lastName}</h1>
                                                    <h1><strong>Direccion:</strong> {detalles[0].user[0].adress}</h1>
                                                    <h1><strong>Horario:</strong> {detalles[0].date.slice(11, -5)}</h1>
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
                                                        <button onClick={handleDelivered} className={buttonclass}> Pedido Entregado </button>
                                                    }
                                                </div>
                                        <br />
                                    </div>
                                    :
                                    <h1>No Posee ninguna orden asignada</h1>
                                }
                        </div>
    )
}