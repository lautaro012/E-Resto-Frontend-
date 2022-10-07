
import { Modal, Label, Checkbox } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../config";
import { Input, StateTypes, Submit } from "../../Interfaces/Interfaces";
import { cleanError, logUser } from "../../redux/actions";
import { buttonclass } from "../../Style/Clases/Clases";
import {inputForm} from '../../Style/Clases/Clases'
import './Loggin.css'

export default function Loggin({ openlog, showLoggin }: any) {

    const navigate = useNavigate()
    let dispatch = useAppDispatch();
    let error = useAppSelector((state: StateTypes) => state.error);
    const [loading, setLoading] = useState<boolean>(false)
    const [input, setInput] = useState<{ mail: string; password: string }>({
        mail: "",
        password: "",
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
            })
        )
    }, [])

    const handleSubmit = (e: Submit) => {
        e.preventDefault()
        setLoading(true)
        dispatch(logUser(navigate, input));
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    };



    return (
        <div>
            <Modal show={showLoggin} size="md" popup={true} onClose={openlog}>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                        <form onSubmit={handleSubmit}>
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                Sign in to our platform
                            </h3>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="mail" value="Your mail" />
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
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="password" value="Your password" />
                                </div>
                                <input className={inputForm} name='password' onChange={handleChange} id="password" type="password" required={true} />
                            </div>
                            <div className="flex justify-between">
                                <div className="flex items-center gap-2">
                                    <Checkbox id="remember" />
                                    <Label htmlFor="remember">Remember me</Label>
                                </div>
                                <a
                                    href="/modal"
                                    className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                                >
                                    Lost Password?
                                </a>
                            </div>
                            {
                                error.length === 0 ?
                                    null
                                    :
                                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                        {error.name}
                                    </h3>
                            }
                            {
                                loading ?
                                    <div className="loggin-conteiner">
                                    <button disabled type='submit' className={buttonclass}>                            <svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                    </svg>
                                        Log in to your account</button>
                                    </div>
                                    :
                                    <div className="loggin-conteiner">
                                        <button type='submit' className={buttonclass}>Log in to your account</button>
                                    </div>
                            }
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                Not registered?{" "}

                                <button
                                    onClick={() => navigate('/register')}
                                    className="text-blue-700 hover:underline dark:text-blue-500"
                                >
                                    Create account
                                </button>

                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}
