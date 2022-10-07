import { useEffect, useState } from "react";
import { useAppSelector } from '../../config'
import { Modal, Button } from "flowbite-react";
import Check from "../CheckoutPayment/Check";

export default function ContadorLs(render: any) {

    const items = useAppSelector((state) => state.cart)
    const [propina, setPropina] = useState<number>(0);
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
                <h1>Propina ? (Sin ellos, su envio no seria posible)</h1>
                <button onClick={() => setPropina(50)}>$50</button>
                <button onClick={() => setPropina(100)}>$100</button>
                <button onClick={() => setPropina(150)}>$150</button>
                <button onClick={() => setPropina(200)}>$200</button>
                <div className="Label">
                    <label>Otro monto : $</label>
                    <input
                        type='number'
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
                <Button onClick={() => setOpenModal(true)}>
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