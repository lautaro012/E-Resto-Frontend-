
import { Modal, Label, TextInput, Checkbox } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../config";
import { Input, StateTypes, Submit } from "../../Interfaces/Interfaces";
import { cleanError, logUser } from "../../redux/actions";
import { buttonclass } from "../../Style/Clases/Clases";

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
        dispatch(logUser(navigate,input));
        setTimeout(() =>{
            setLoading(false)
        }, 1000)
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
                                <TextInput
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
                                <TextInput name='password' onChange={handleChange} id="password" type="password" required={true} />
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
                            <div className="w-full">
                                <button type='submit' className={buttonclass}>Log in to your account</button>
                            </div>
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
