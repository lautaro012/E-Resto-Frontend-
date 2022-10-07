import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../config'
import { addToCart, getFoodById, vaciarComida } from '../../redux/actions/index'
import '../DetailProduct/DetailProduct.css'
//import ModalInDetail from "../Modal/Modal";
//import useModal from "../../hooks/useModal";
import { Dropdown, Modal } from "flowbite-react";

export default function DetailProduct({ id, closeModalDetail }) {

    const dispatch = useAppDispatch()
    const food = useAppSelector((state) => state.detail[0]);
    const categories = useAppSelector((state) => state.categories);
    const cart = useAppSelector((state) => state.cart);

    useEffect(() => {
        dispatch(getFoodById(id))
        return function limpiar() {
            dispatch(vaciarComida())
        }
    }, [dispatch, id])

    //const [isOpenModal, openModal, closeModal] = useModal()
    //const [datosModal, setDatosModal] = useState()
    const [extraItem, setExtraItem] = useState(null);
    const [extra, setExtra] = useState(0);

    // function modalData(categoria) {
    //     openModal()
    //     setDatosModal(categoria)
    // }

    function closeDetailModal() {
        closeModalDetail(false)
    }

    function addFoodToCart() {

        let itemFound = cart.find(item => item._id === food._id)
        let itemExtraFound
        if (extraItem !== null) {
            itemExtraFound = cart.find(item => item._id === extraItem._id)
        }

        if (!itemFound) {

            let item = {
                ...food,
                price: food.off ? food.price - ((food.price * food.off) / 100) : food.price,
                cantidad: 1
            }
            dispatch(addToCart(item))
            if (!itemExtraFound && extraItem !== null) {
                let item = {
                    ...extraItem,
                    cantidad: 1
                }
                dispatch(addToCart(item))
            }
            alert(`Se agrego ${food.name}`)
            closeDetailModal()
        }
        else {
            //let itemFound = cart.find(item => item._id === food._id)
            alert(`Ya esta agregado ${food.name} al carrito`)
            closeDetailModal()
        }
    }

    // function handleRadio(event) {
    //     event.preventDefault()
    //     console.log("LABEL", event.target.value)
    //     console.log("value radio", event.target.value.price)
    //     setExtra(Number(event.target.value.price))
    //     setExtraItem(event.target.value)
    // }

    function handleExtraItem(item) {
        setExtraItem(item)
        setExtra(item.price)
    }

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
                                    {
                                        food.off ?
                                            <div>
                                                {
                                                    extra ?
                                                        <div>
                                                            <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white text-decoration-line: line-through">${food.price}</h2>
                                                            <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">OFF : {food.off}</h2>
                                                            <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Extras : ${extra}</h2>
                                                            <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Total $ {(food.price - ((food.price * food.off) / 100)) + extra}</h2>
                                                        </div>
                                                        :
                                                        <div>
                                                            <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white text-decoration-line: line-through">${food.price}</h2>
                                                            <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">OFF : {food.off}</h2>
                                                            <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Total $ {food.price - ((food.price * food.off) / 100)}</h2>
                                                        </div>
                                                }
                                            </div>
                                            :
                                            <div>
                                                {
                                                    extra ?
                                                        <div>
                                                            <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">${food.price}</h2>
                                                            <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Extras : ${extra}</h2>
                                                            <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Total $ {food.price + extra}</h2>
                                                        </div>
                                                        :
                                                        <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">${food.price}</h2>
                                                }
                                            </div>
                                    }

                                    <button id="buttons_detail_buy" onClick={() => addFoodToCart()}>Agregar al carrito 🛒</button>
                                </div>
                                <div id="detalle_der">
                                    <div>
                                        <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Detalles</h1>
                                        <p>{food.description}</p>
                                    </div>
                                    <div id="detail_contenedor_labels">
                                        {/* <button className="detail_label" onClick={(event) => modalData("Bebidas sin Alcohol")}><h2>Bebidas sin Alcohol (opcional)</h2></button>

                                        <button className="detail_label" onClick={(event) => modalData("Cervezas")}><h2>Cervezas (opcional)</h2></button> */}

                                        <Dropdown label="Bebidas (opcional)">
                                            <Dropdown.Header>
                                                <span className="block text-l">
                                                    Bebidas sin alcohol
                                                </span>
                                            </Dropdown.Header>
                                            {
                                                categories && categories.map(cat => {
                                                    if (cat.name === "Bebidas sin Alcohol") {
                                                        return (
                                                            <div>
                                                                {
                                                                    cat && cat.categoryProducts.map(prod => {
                                                                        return (
                                                                            <button onClick={() => handleExtraItem(prod)}>
                                                                                <Dropdown.Item>
                                                                                    {prod.name}
                                                                                </Dropdown.Item>
                                                                            </button>

                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        )
                                                    }
                                                    return null

                                                })

                                            }
                                            <Dropdown.Divider />
                                            <Dropdown.Header>
                                                <span className="block text-l">
                                                    Cervezas
                                                </span>
                                            </Dropdown.Header>
                                            {
                                                categories && categories.map(cat => {
                                                    if (cat.name === "Cervezas") {
                                                        return (
                                                            <div>
                                                                {
                                                                    cat && cat.categoryProducts.map(prod => {
                                                                        return (
                                                                            <button onClick={() => handleExtraItem(prod)}>
                                                                                <Dropdown.Item>
                                                                                    {prod.name}
                                                                                </Dropdown.Item>
                                                                            </button>

                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        )
                                                    }
                                                    return null

                                                })

                                            }
                                        </Dropdown>
                                    </div>
                                    <div>
                                        <h2>Comentarios</h2>
                                        <textarea
                                            name='comentarios'
                                            placeholder="Algo que nos quieras comentar sobre el pedido ?"
                                            rows={5} cols={40}
                                        />
                                    </div>
                                    <div>
                                        {
                                            extraItem && extraItem ?
                                                <div>
                                                    <img src={extraItem.img} alt={extraItem.name} width="200px" height="00px" />
                                                    <h1>{extraItem.name}</h1>
                                                    <h2>$ {extraItem.price}</h2>
                                                </div>
                                                :
                                                null
                                        }
                                    </div>
                                    {/* <ModalInDetail
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
                                                                                    // <div className="modal_inputs_details">
                                                                                    //     <h1 className="text-m font-semibold tracking-tight text-gray-900 dark:text-white">{prod.name}</h1>
                                                                                    //     <input type="checkbox" value={prod.price}></input>
                                                                                    //     <label>{prod.name}</label>
                                                                                    //     <h2>$ {prod.price}</h2>
                                                                                    // </div>
                                                                                    <div className="modal_inputs_details">
                                                                                        <h1 className="text-m font-semibold tracking-tight text-gray-900 dark:text-white">{prod.name}</h1>
                                                                                        <input type="radio" onClick={(event) => handleRadio(event)} value={prod.price} id={prod._id} name="extra_item" />
                                                                                        <label htmlFor={prod._id}> {prod.name} </label>
                                                                                        <h2>$ {prod.price}</h2>
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
                                    </ModalInDetail> */}
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                    :
                    <h3>Loading</h3>
            }

        </div >
    )
}