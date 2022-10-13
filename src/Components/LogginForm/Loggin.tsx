
import { Modal, Label, Checkbox } from "flowbite-react";
import { ModalBody } from "flowbite-react/lib/esm/components/Modal/ModalBody";
import { ModalFooter } from "flowbite-react/lib/esm/components/Modal/ModalFooter";
import { ModalHeader } from "flowbite-react/lib/esm/components/Modal/ModalHeader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../config";
import { Input, StateTypes, Submit } from "../../Interfaces/Interfaces";
import { cleanError, logUser } from "../../redux/actions";
import { buttonclass } from "../../Style/Clases/Clases";
import { inputForm } from '../../Style/Clases/Clases'
import Login from "../Auth/Login";
import SendMail from "../ForgotPass/SendMail";
import Register from "../RegisterForm/RegisterForm";
import './Loggin.css'

export default function Loggin({ openlog, showLoggin }: any) {

    const navigate = useNavigate()
    let dispatch = useAppDispatch();
    let error = useAppSelector((state: StateTypes) => state.error);
    const [loading, setLoading] = useState<boolean>(false)
    const [openRegister, setOpenRegister] = useState<boolean>(false)
    const [forgotPW, setForgotPW] = useState<boolean>(false)

    const [input, setInput] = useState<{ mail: string; password: string; google: boolean }>({
        mail: "",
        password: "",
        google: false
    });

    const handleChange = (e: Input) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        dispatch(cleanError())
    };

    useEffect(() => {
        return (
            setInput({
                mail: "",
                password: "",
                google: false
            }),
            dispatch(cleanError())
        )
    }, [dispatch])

    const handleSubmit = (e: Submit) => {
        e.preventDefault()
        setLoading(true)
        dispatch(logUser(navigate, input));
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    };

    function closeRegister() {
        setOpenRegister(false)
    }

    function closeForgotPW() {
        setForgotPW(false)
    }

    return (
        <Modal show={showLoggin} size="lg" popup={true} onClose={openlog} data-aos="zoom-in" data-aos-duration="100">
            <Modal.Header />
            <Modal.Body>
                <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                    <form onSubmit={handleSubmit}>
                        <div className="loggin-conteiner">
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                Ingresa a nuestra plataforma
                            </h3>
                        </div>
                        <br></br>
                        <hr></hr>
                        <br></br>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="mail" value="Mail" />
                            </div>
                            <input
                                className={inputForm}
                                onChange={handleChange}
                                id="mail"
                                name='mail'
                                type='email'
                                placeholder="name@company.com"
                                required={true}
                            />
                        </div>
                        <br></br>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password" value="Contraseña" />
                            </div>
                            <input className={inputForm} name='password' onChange={handleChange} id="password" type="password" required={true} />
                        </div>
                        <br></br>
                        <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                                <Checkbox id="remember" />
                                <Label htmlFor="remember">Recuerdame</Label>
                            </div>
                            <button
                                onClick={() => setForgotPW(true)}
                                className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                            >
                                ¿ Olvidaste la contraseña ?
                            </button>

                        </div>
                        <br></br>
                        {
                            error ?
                                <div className="loggin-conteiner">
                                    <h1 className="text-amber-700 text-xl">{error.response.data}</h1>
                                </div>

                                :
                                null
                        }
                        <br></br>
                        {
                            loading ?
                                <div className="loggin-conteiner">
                                    <button disabled type='submit' className={buttonclass}>                            <svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                    </svg>    Iniciar sesion</button>
                                </div>
                                :
                                <div className="loggin-conteiner">
                                    <button type='submit' className={buttonclass}>Iniciar sesion</button>
                                </div>
                        }
                        <br></br>
                        <hr></hr>
                        <br></br>
                        <div className="loggin-conteiner">
                            <Login></Login>
                        </div>
                        <br></br>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            <span> ¿ No estas registrado ? </span>
                            <button
                                onClick={() => setOpenRegister(true)}
                                className="text-blue-700 hover:underline dark:text-blue-500"
                            >
                                Crear cuenta
                            </button>
                            <Modal
                                show={openRegister}
                                onClose={closeRegister}
                                size="5xl"
                                data-aos="zoom-in-down"
                                data-aos-duration="1500"
                            >
                                <ModalHeader>
                                    Registro en Henry's Resto Proyect
                                </ModalHeader>
                                <ModalBody>
                                    <Register></Register>
                                </ModalBody>
                                <ModalFooter>
                                    <a href="/">Henry's Resto Project™</a>
                                </ModalFooter>
                            </Modal>
                        </div>
                    </form>
                    {
                        forgotPW === true ?
                            <div>
                                <Modal
                                    show={forgotPW}
                                    onClose={closeForgotPW}
                                    size="4xl"
                                    data-aos="zoom-in-up"
                                    data-aos-duration="1500"
                                >
                                    <ModalHeader>
                                        Recuperacion de contraseña en Henry's Resto Proyect
                                    </ModalHeader>
                                    <ModalBody>
                                        <SendMail></SendMail>
                                    </ModalBody>
                                    <ModalFooter>
                                        <a href="/">Henry's Resto Project™</a>
                                    </ModalFooter>
                                </Modal>
                            </div>
                            :
                            null
                    }
                </div>
            </Modal.Body>
        </Modal>
    );
}
