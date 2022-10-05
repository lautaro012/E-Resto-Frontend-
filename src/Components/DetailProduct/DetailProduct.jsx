//import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../config'
import { addToCart, getFoodById, vaciarComida } from '../../redux/actions/index'
import '../DetailProduct/DetailProduct.css'
import ModalInDetail from "../Modal/Modal";
import useModal from "../../hooks/useModal";
import { Modal } from "flowbite-react";

export default function DetailProduct({ id, closeModalDetail }) {

    // const { id } = useParams() // usa el parametro de la URL
    const dispatch = useAppDispatch()
    const food = useAppSelector((state) => state.detail[0]);
    const categories = useAppSelector((state) => state.categories);
    const cart = useAppSelector((state) => state.cart);

    useEffect(() => {
        //  dispatch(getCategories())
        dispatch(getFoodById(id))
        return function limpiar() {
            dispatch(vaciarComida())
        }
    }, [dispatch, id])

    const [isOpenModal, openModal, closeModal] = useModal()
    const [datosModal, setDatosModal] = useState()
    const [cantidad, setCantidad] = useState(1);
    //const [precio, setPrecio] = useState(food.price);

    function modalData(categoria) {
        openModal()
        setDatosModal(categoria)
    }

    function closeDetailModal() {
        closeModalDetail(false)
    }

    function addFoodToCart(cantidad) {

        let itemFound = cart.map(item => item._id).includes(food._id)

        if (!itemFound) {

            let item = {
                _id: food._id,
                name: food.name,
                price: food.price,
                image: food.img,
                rating: food.rating,
                cantidad: cantidad
            }
            dispatch(addToCart(item))
            alert(`Se agrego ${food.name}`)
            closeDetailModal()
        }
        else {
            let itemFound = cart.find(item => item._id === food._id)
            itemFound.cantidad++
            alert(`Se volvio a agregar ${food.name} al carrito`)
            closeDetailModal()
        }
    }

    // function handdlePrice(numero) {
    //     setCantidad(numero)
    //     setPrecio(cantidad * precio)
    // }



    return (
        <div >
            {
                food && food ?
                    <Modal show={closeModalDetail} size="6xl" popup={true} onClose={closeDetailModal}>
                        <Modal.Header>
                            <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{food.name}</h1>
                        </Modal.Header>
                        <Modal.Body>
                            <hr></hr>
                            <div id="contenedor_detail">
                                <div id="detalle_izq">
                                    <img src={food.img} alt="ImagenPOP" id="imagen_detail_modal" ></img>
                                    {/* {
                                        precio && precio ?
                                            <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">$
                                                {precio}
                                            </h2>
                                            :
                                            <h2>{food.price}</h2>
                                    } */}
                                    <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">${food.price * cantidad}</h2>
                                    {
                                        food.off !== 0 ?
                                            <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{food.off}</h2>
                                            :
                                            null
                                    }
                                    <div className="Label">
                                        <label>Cantidad</label>
                                        <input
                                            type='number'
                                            value={cantidad}
                                            name='cantidad'
                                            min="1" max="10"
                                            onChange={(event) => setCantidad(Number(event.target.value))}
                                        />
                                    </div>
                                    <button id="buttons_detail_buy" onClick={() => addFoodToCart(cantidad)}>Add to cart 🛒</button>
                                </div>
                                <div id="detalle_der">
                                    <div>
                                        <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Detalles</h1>
                                        <p>{food.description}</p>
                                    </div>
                                    <div id="detail_contenedor_labels">
                                        <button className="detail_label" onClick={(event) => modalData("Bebidas sin Alcohol")}><h2>Bebidas sin Alcohol (opcional)</h2></button>

                                        <button className="detail_label" onClick={(event) => modalData("Cervezas")}><h2>Cervezas (opcional)</h2></button>

                                        <button className="detail_label" onClick={(event) => modalData("Postres")}><h2>Postres (opcional)</h2></button>
                                    </div>
                                    <div>
                                        <h2>Comentarios</h2>
                                        <textarea
                                            name='comentarios'
                                            placeholder="Algo que nos quieras comentar sobre el pedido ?"
                                            rows={5} cols={40}
                                        />
                                    </div>
                                    <ModalInDetail
                                        isOpen={isOpenModal}
                                        closeModal={closeModal}
                                        title={datosModal}
                                    >
                                        {
                                            datosModal ?
                                                <div>
                                                    {
                                                        categories && categories.map(cat => {
                                                            if (cat.name === datosModal) {
                                                                return (
                                                                    <div>
                                                                        {
                                                                            cat && cat.categoryProducts.map(prod => {
                                                                                return (
                                                                                    <div className="modal_inputs_details">
                                                                                        <h3 className="text-m font-semibold tracking-tight text-gray-900 dark:text-white">{prod.name}</h3>
                                                                                        <input type="checkbox" value={prod.name}></input>
                                                                                        <label>{prod.name}</label>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>
                                                                )
                                                            }
                                                            return null

                                                        })

                                                    }
                                                </div>
                                                :
                                                <h1>Cualquier cosa</h1>
                                        }
                                    </ModalInDetail>
                                </div>
                                {/* <button onClick={() => closeDetailModal()}>CERRAR</button>
                                <Link to='/pedidos'><button>Volver</button></Link> */}
                            </div>
                        </Modal.Body>
                    </Modal>
                    :
                    <h3>Loading</h3>
            }

        </div >
    )
}