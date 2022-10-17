import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../config"
import { getUserById } from "../../redux/actions"
import { buttonclass } from "../../Style/Clases/Clases"


export default function OrderDelivery ({detalles}:any) {
    
    const dispatch = useAppDispatch()
 
    const user = useAppSelector(state => state.userDetail)
    console.log(user)
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
                                        {/* <h3>Detalles[0] de la entrega:</h3>
                                        <div className="timer-conteiner">
                                            <h1><strong>Para:</strong> {detalles[0].User__[0].name} {detalles[0].User__[0].lastName}</h1>
                                            <h1><strong>Direccion:</strong> {detalles[0].User__[0].adress}</h1>
                                            <h1><strong>Horario:</strong> {detalles[0].date.slice(11, -5)}</h1>
                                        </div>
                                        <br></br>
                                        <div className="timeline-buttons">
                                            <button className={buttonclass}> Pedido Entregado </button>
                                        </div>
                                        <br /> */}
                                    </div>
                                    :
                                    <h1>No Posee ninguna orden asignada</h1>
                                }
                        </div>
    )
}