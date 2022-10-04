import { CardForm, Category, Input, Select, Submit, TextArea } from "../../Interfaces/Interfaces";
import { buttonclass, inputForm, labelForm } from "../../Style/Clases/Clases";
import { createProduct, getCategories, editProduct } from "../../redux/actions";
import { Modal } from "flowbite-react";
import { useState } from "react";
import { useAppDispatch } from "../../config";

export default function Loggin() {

    const [showLoggin, setShowLoggin] = useState<boolean>(false)
    let dispatch = useAppDispatch()
    const [input, setInput] = useState<{mail: string, password: string}>({
        mail: '',
        password: '',
      });


    const handleChange = (e: Input | TextArea)  => {
    setInput({
        ...input,
        [e.target.name]: e.target.value,
    });
    };
    const handleClose = () => {
        setShowLoggin(false)
    }

    const handleSubmit = (e: Submit) => {
    dispatch();
    setInput({
        mail: '',
        password: '',
    })};
    const openlog = () => {
        showLoggin ? setShowLoggin(false) : setShowLoggin(true)
    }

    return (
        <div>
            <button onClick={openlog} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" data-modal-toggle="authentication-modal">
                Toggle modal
            </button>

            <Modal  show={showLoggin} size="sm" popup={true} onClose={handleClose}>
        <Modal.Header />
        <Modal.Body>
          <div className=''>
            <aside>
                Inicie Sesion
              <br></br>
              <div>
                <form onSubmit={e => handleSubmit(e)}>
                  <div className="relative z-0 mb-6 w-full group">
                    <input
                      type="e-mail"
                      onChange={e => handleChange(e)}
                      maxLength={30}
                      name="mail"
                      id="mail"
                      className={inputForm}
                      placeholder=" "
                      required
                    />
                    <label htmlFor="mail" className={labelForm}>
                      E-mail
                    </label>
                  </div>
                  <div className="relative z-0 mb-6 w-full group">
                    <input
                      type="password"
                      onChange={e => handleChange(e)}
                      maxLength={20}
                      name="password"
                      id="password"
                      className={inputForm}
                      placeholder=" "
                      required
                    />
                    <label htmlFor="password" className={labelForm}>
                      Password
                    </label>
                  </div>

                    <button className={buttonclass} type="submit">
                      Iniciar Sesion
                    </button>
                </form>
              </div>
            </aside>
          </div>
        </Modal.Body>
      </Modal>
    </div>
    )
}