import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../config'
import { getFoodById, getCategories, vaciarComida } from '../../redux/actions/index'
import '../DetailProduct/DetailProduct.css'
import ModalInDetail from "../Modal/Modal";
import useModal from "../../hooks/useModal";
import { Modal } from "flowbite-react";

export default function DetailProduct({ id, closeModalDetail }) {

    // const { id } = useParams() // usa el parametro de la URL
    const dispatch = useAppDispatch()
    const food = useAppSelector((state) => state.detail[0]);
    const categories = useAppSelector((state) => state.categories);

    useEffect(() => {
        //  dispatch(getCategories())
        dispatch(getFoodById(id))
        return function limpiar() {
            dispatch(vaciarComida())
        }
    }, [dispatch, id])

    const [isOpenModal, openModal, closeModal] = useModal()
    const [datosModal, setDatosModal] = useState()

    function modalData(categoria) {
        openModal()
        setDatosModal(categoria)
    }

    function closeDetailModal() {
        closeModalDetail(false)
    }

    console.log("ID POR PARAMS DETAIL", id)
    console.log("DETAIL_ID", food)

    return (
        <div >
            {
                food && food ?
                    <Modal show={closeModalDetail} size="6xl" popup={true} onClose={closeDetailModal}>
                        <Modal.Header />
                        <Modal.Body>
                            <div id="contenedor_detail">
                                <div id="detalle_izq">
                                    <h1>{food.name}</h1>
                                    <img src={food.img} alt="ImagenPOP" id="imagen_detail_modal" ></img>
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
                                        <button onClick={(event) => modalData("Bebidas sin Alcohol")}><h2>Bebidas sin Alcohol (opcional)</h2></button>
                                    </div>
                                    <div className="detail_label">
                                        <button onClick={(event) => modalData("Cervezas")}><h2>Cervezas (opcional)</h2></button>
                                    </div>
                                    <div className="detail_label">
                                        <button onClick={(event) => modalData("Postres")}><h2>Postres (opcional)</h2></button>
                                    </div>
                                    <div>
                                        <h2>Comentarios</h2>
                                        <textarea
                                            name='comentarios'
                                            placeholder="Algo que nos quieras comentar sobre el pedido ?"
                                            rows={5} cols={55}
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
                                                                                    <div>
                                                                                        <h3>{prod.name}</h3>
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