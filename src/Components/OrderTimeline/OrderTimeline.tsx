import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../config";
import { StateTypes } from "../../Interfaces/Interfaces";
import { getOrdenByID } from "../../redux/actions";
import { buttonclass } from "../../Style/Clases/Clases";
import "./OrderTimeline.css";
import Greencheck from '../../Style/images/icons8-checkmark-40.png'
import Redcheck from '../../Style/images/red-check.png'

export default function OrderTimeline({ idOrden }: any) {

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getOrdenByID(idOrden))
    }, [dispatch, idOrden])

    let detalles = useAppSelector((state: StateTypes) => state.ordenDetail);
    console.log(detalles)

    return (
        <>

            {
                detalles.length === 0 ?
                    <h1> CARGANDO .... </h1>
                    :
                    <div className="orden-details-conteiner">
                        <div className="Timeline-conteiner">
                            <ol className="relative border-l border-gray-200 dark:border-gray-700">

                                <li className="mb-10 ml-6">
                                    <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                        <img
                                            id="imagen-timeline"
                                            className="rounded-full w-45 shadow-lg"
                                            src={Greencheck}
                                            alt="Thomas Lean img"
                                            width={45}
                                        />
                                    </span>
                                    <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-700 dark:border-gray-600">
                                        <div className="justify-between items-center mb-3 sm:flex">
                                            <strong> Orden Recibida </strong>
                                        </div>
                                        <div className="p-3 text-xs italic font-normal text-gray-500 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300">
                                            Tu orden ha sido recibida y la estamos preparando para vos.
                                        </div>
                                    </div>
                                </li>

                                <li className={detalles[0].prepared ? "mb-10 ml-6" : "mb-10 ml-6 opacity-50"}>
                                    <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                        <img
                                            id="imagen-timeline"
                                            className="rounded-full shadow-lg"
                                            src={detalles[0].prepared ? Greencheck : Redcheck}
                                            alt="Thomas Lean img"
                                        />
                                    </span>
                                    <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-700 dark:border-gray-600">
                                        <div className="justify-between items-center mb-3 sm:flex">
                                            <strong> Orden Preparada </strong>
                                        </div>
                                        <div className="p-3 text-xs italic font-normal text-gray-500 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300">
                                            Tu orden ha sido preparada y esta esperando a su repartidor.
                                        </div>
                                    </div>
                                </li>

                                <li className={detalles[0].Delivery__.length !== 0 ? "mb-10 ml-6" : "mb-10 ml-6 opacity-50"}>
                                    <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                        <img
                                            id="imagen-timeline"
                                            className="rounded-full shadow-lg"
                                            src={detalles[0].Delivery__.length !== 0 ? Greencheck : Redcheck}
                                            alt="Thomas Lean img"
                                        />
                                    </span>
                                    <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-700 dark:border-gray-600">
                                        <div className="justify-between items-center mb-3 sm:flex">
                                            <strong> El repartidor esta esperando tu pedido </strong>
                                        </div>
                                        <div className="p-3 text-xs italic font-normal text-gray-500 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300">
                                            El Delivery ya tiene tu pedido y lo estaras recibiendo en breve.
                                        </div>
                                    </div>
                                </li>

                                <li className={detalles[0].delivered ? "mb-10 ml-6" : "mb-10 ml-6 opacity-50"}>
                                    <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                        <img
                                            id="imagen-timeline"
                                            className="rounded-full shadow-lg"
                                            src={detalles[0].delivered ? Greencheck : Redcheck}
                                            alt="Thomas Lean img"
                                        />
                                    </span>
                                    <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-700 dark:border-gray-600">
                                        <div className="justify-between items-center mb-3 sm:flex">
                                            <strong> Pedido entregado </strong>
                                        </div>
                                        <div className="p-3 text-xs italic font-normal text-gray-500 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300">
                                            Tu pedido ha sido entregado, que lo disfrutes!.
                                        </div>
                                    </div>
                                </li>
                            </ol>
                        </div>
                        <div className="details-order">
                            <h1> Detalles del pedido </h1>
                            <div className="detail-price-conteiner">
                                {
                                    detalles[0].items.map((item: any) => {
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
                            <div className="timer-conteiner">
                                <h1><strong>Para:</strong> {detalles[0].User__[0].name} {detalles[0].User__[0].lastName}</h1>
                                <h1><strong>Direccion:</strong> {detalles[0].User__[0].adress}</h1>
                                <h1><strong>Horario:</strong> {detalles[0].date.slice(11, -5)}</h1>
                            </div>

                            <br></br>
                            <div className="timeline-buttons">
                                <button className={buttonclass}> Cancelar Orden</button>
                                {
                                    detalles[0].Delivery__.length !== 0 ?
                                        <button className={buttonclass}>Ver mapa </button>
                                        :
                                        null
                                }
                            </div>
                            <br />
                        </div>
                    </div>
            }
        </>
    );
}
