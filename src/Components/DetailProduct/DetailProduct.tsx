import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../../config'
import { getFoodById, vaciarComida } from '../../redux/actions/index'
import BebidasSinAlcohol from '../../_temp/BebidasSinAlcohol.json'
import Postres from '../../_temp/Postres.json'
import '../DetailProduct/DetailProduct.css'

export default function DetailProduct() {

    const { id } = useParams() // usa el parametro de la URL
    const dispatch = useAppDispatch()
    const food = useAppSelector((state: any) => state.detail[0]);

    useEffect(() => {
        dispatch(getFoodById(id))
        return function limpiar() {
            dispatch(vaciarComida())
        }
    }, [dispatch, id])

    console.log(food)

    return (
        <div >
            {
                food && food ?
                    <div id="contenedor_detail">
                        <div id="detalle_izq">
                            <h1>{food.name}</h1>
                            <img src={food.img} alt="ImagenPOP" ></img>
                            <h2>$ {food.price}</h2>
                            {
                                food.off !== 0 ?
                                    <h2>{food.off}</h2>
                                    :
                                    null
                            }
                        </div>
                        <div id="detalle_der">
                            <div>
                                <h2>Detalles</h2>
                                <p>{food.description}</p>
                            </div>
                            <div className="detail_label">
                                <details>
                                    <summary><h2>Bebida (opcional)</h2></summary>
                                    {
                                        BebidasSinAlcohol.map(bebida => {
                                            return (
                                                <option>{bebida.name}</option>
                                            )
                                        })
                                    }
                                </details>
                            </div>
                            <div className="detail_label">
                                <details>
                                    <summary><h2>Postre (opcional)</h2></summary>
                                    {
                                        Postres.map(postre => {
                                            return (
                                                <option>{postre.name}</option>
                                            )
                                        })
                                    }
                                </details>
                            </div>
                            <div>
                                <h2>Comentarios</h2>
                                <textarea
                                    name='comentarios'
                                    placeholder="Algo que nos quieras comentar sobre el pedido ?"
                                    rows={5} cols={55}
                                />
                            </div>
                        </div>
                        <Link to='/pedidos'><button>Volver</button></Link>
                    </div>
                    :
                    <h3>Loading</h3>
            }

        </div >
    )
}