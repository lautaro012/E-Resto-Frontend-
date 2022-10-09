import { useEffect, useState } from "react";
import { useAppSelector } from '../../config'
import { Modal, Button } from "flowbite-react";
import Check from "../CheckoutPayment/Check";

export default function ContadorLs(render: any) {

    const items = useAppSelector((state) => state.cart)
    const [propina, setPropina] = useState<number>(100);
    const [openModal, setOpenModal] = useState<boolean | undefined>(false)

    let subTotal = 0;
    for (let i = 0; i < items.length; i++) {

        subTotal += items[i].price * items[i].cantidad

    }

    let total = subTotal + propina

    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(items));
        localStorage.setItem("precioTotal", JSON.stringify(total));
    }, [items, total, render]);

    function closeModal() {
        setOpenModal(false)
    }

    return (
        <div>
            <div id="conteiner_propinas">
                <h1 className="text-m font-semibold tracking-tight text-gray-900 dark:text-white">Propina ?</h1>
                <span className="text-m tracking-tight text-gray-900 dark:text-white"> (Sin ellos, su envio no seria posible)</span>
                <div id="contenedor_propina">
                    <Button id="propina" color="success" onClick={() => setPropina(50)}>$50</Button>
                    <Button id="propina" color="success" onClick={() => setPropina(100)}>$100</Button>
                    <Button id="propina" color="success" onClick={() => setPropina(150)}>$150</Button>
                    <Button id="propina" color="success" onClick={() => setPropina(200)}>$200</Button>
                </div>
                <div className="Label">
                    <input
                        type='number'
                        className="
                        form-control
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                      "
                        value={propina}
                        name='propina'
                        min="0" max={subTotal}
                        onChange={(event) => setPropina(Number(event.target.value))}
                    />
                </div>
            </div>
            <div id="caja">
                <h2>Sub total : ${subTotal}</h2>
                <h2>Propina : ${propina}</h2>
                <hr />
                <h1>Total : ${total}</h1>
                <Button id="pedido_ya" onClick={() => setOpenModal(true)}>
                    Hacer pedido ya !
                </Button>
                <Modal
                    show={openModal}
                    onClose={closeModal}
                >
                    <Modal.Header>
                        Elegi tu metodo de pago
                    </Modal.Header>
                    <Modal.Body>
                        <Check
                            precio={total}
                        ></Check>
                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}