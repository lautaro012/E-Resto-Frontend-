import { Modal } from "flowbite-react";
import { useState } from "react";
import { buttonclass, inputForm, labelForm } from "../../Style/Clases/Clases";


export default function Register () {
    const [showRegister, setshowRegister] = useState<boolean>(false)

    const handleClose = () => {
        setshowRegister(false)
    }
    const openlog = () => {
        showRegister ? setshowRegister(false) : setshowRegister(true)
    }

    return (
        <div>
        <button onClick={openlog} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" data-modal-toggle="authentication-modal">
            Toggle modal
        </button>

        <Modal  show={showRegister} size="sm" popup={true} onClose={handleClose}>
    <Modal.Header />
    <Modal.Body>
        <div>
            <form>
                <div>
                    <input placeholder="" name='image' className={inputForm}></input>
                    <label htmlFor="image" className={labelForm}>image</label>
                </div>
                <div>
                    <div>
                        <input className={inputForm}></input>
                        <label className={labelForm}></label>
                    </div>
                    <div>
                        <input className={inputForm}></input>
                        <label className={labelForm}></label>
                    </div>
                </div><div>
                    <div>
                        <input className={inputForm}></input>
                        <label className={labelForm}></label>
                    </div>
                    <div>
                        <input className={inputForm}></input>
                        <label className={labelForm}></label>
                    </div>
                </div>
                <button className={buttonclass}>Registrarse</button>
            </form>
        </div>
    </Modal.Body>
      </Modal>
    </div>
    )
}