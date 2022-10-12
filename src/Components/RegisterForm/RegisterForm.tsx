import { useEffect, useState } from "react";
import './RegisterForm.css'
import {
    buttonclass,
    inputRegister,
} from "../../Style/Clases/Clases";
import { Input, StateTypes } from "../../Interfaces/Interfaces";
import { useAppDispatch, useAppSelector } from "../../config";
import { cleanError, createUser } from "../../redux/actions";
import { useNavigate } from "react-router-dom";

export default function Register() {

    let error = useAppSelector((state: StateTypes) => state.error);
    let dispatch = useAppDispatch()
    let navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)
    const [passwordError, setPasswordError] = useState<boolean>(false)
    const [input, setInput] = useState<any>({
        name: '',
        lastName: '',
        userName: '',
        adress: '',
        password: '',
        repeatpassword:'',
        mail: '',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW2zB9ZfnqjeJkkgqMS7zen-NVpatbD9U3tiEirtof0QIA8Cx3ApChLYPJO9hVdncSkrA&usqp=CAU',
        admin: false
    })

    useEffect(() => {
        return (
            setInput({
                name: '',
                lastName: '',
                userName: '',
                adress: '',
                password: '',
                repeatpassword:'',
                mail: '',
                img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW2zB9ZfnqjeJkkgqMS7zen-NVpatbD9U3tiEirtof0QIA8Cx3ApChLYPJO9hVdncSkrA&usqp=CAU',
                admin: false
            })
        )
    }, [])

    const handleChange = (e: Input) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        dispatch(cleanError())
        setPasswordError(false)
    };

    const handleSubmit = (e: any) => {
        e.preventDefault()
        console.log(input)
        setLoading(true)
        if(input.password === input.repeatpassword){
            dispatch(createUser(input, navigate));
        }else{
            setPasswordError(true)
        }
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }
    return (
        <div className="register-conteiner">
            <form onSubmit={handleSubmit}>
                <h1> Ingrese sus datos : </h1>
                <div className="image-subida">
                    <img width={350} src={input.img} alt='test-img' />
                </div>
                <div className="duo-input">
                    <div className="mb-3 xl:w-96">
                        <label
                            htmlFor="name"
                            className="form-label inline-block mb-2 text-gray-700"
                        >
                            Nombre:
                        </label>
                        <input
                            autoComplete="username"
                            type="text"
                            name='name'
                            className={inputRegister}
                            onChange={handleChange}
                            id="name"
                            placeholder="Nombre"
                            required
                        />
                    </div>
                    <div className="mb-3 xl:w-96">
                        <label
                            htmlFor="lastName"
                            className="form-label inline-block mb-2 text-gray-700"
                        >
                            Apellido:
                        </label>
                        <input
                            type="text"
                            name='lastName'
                            className={inputRegister}
                            onChange={handleChange}
                            id="lastName"
                            placeholder="Apellido"
                            required
                        />
                    </div>
                </div>
                <div className="duo-input">
                    <div className="mb-3 xl:w-96">
                        <label
                            htmlFor="userName"
                            className="form-label inline-block mb-2 text-gray-700"
                        >
                            Usuario:
                        </label>
                        <input
                            autoComplete="username"
                            type="text"
                            name='userName'
                            className={inputRegister}
                            onChange={handleChange}
                            id="userName"
                            placeholder="Nombre de Usuario"
                        />
                    </div>
                    <div className="mb-3 xl:w-96">
                        <label
                            htmlFor="mail"
                            className="form-label inline-block mb-2 text-gray-700"
                        >
                            E-mail:
                        </label>
                        <input
                            type="email"
                            name="mail"
                            className={inputRegister}
                            onChange={handleChange}
                            id="mail"
                            placeholder="E-mail"
                            required
                        />
                    </div>
                </div>
                <div className="duo-input">
                    <div className="mb-3 xl:w-96">
                        <label
                            htmlFor="password"
                            className="form-label inline-block mb-2 text-gray-700"
                        >
                            Contraseña:
                        </label>
                        <input
                            autoComplete="new-password"
                            type="password"
                            name='password'
                            className={inputRegister}
                            onChange={handleChange}
                            id="password"
                            required
                            placeholder="Contraseña"
                        />
                    </div>
                    <div className="mb-3 xl:w-96">
                        <label
                            htmlFor="repeatpassword"
                            className="form-label inline-block mb-2 text-gray-700"
                        >
                            Repita su contraseña:
                        </label>
                        <input
                            autrepeat-oComplete="new-password"
                            type="password"
                            name='repeatpassword'
                            className={inputRegister}
                            onChange={handleChange}
                            id="repeatpassword"
                            placeholder="Repita la Contraseña"
                        />
                    </div>
                </div>
                <div className="duo-input">
                    <div className="mb-3 xl:w-96">
                        <label
                            htmlFor="adress"
                            className="form-label inline-block mb-2 text-gray-700"
                        >
                            Direccion:
                        </label>
                        <input
                            type="text"
                            name='adress'
                            className={inputRegister}
                            onChange={handleChange}
                            id="adress"
                            placeholder="Direccion"
                        />
                    </div>
                    <div className="mb-3 xl:w-96">
                        <label
                            htmlFor="img"
                            className="form-label inline-block mb-2 text-gray-700"
                        >
                            Imagen:
                        </label>
                        <input
                            type="url"
                            name='img'
                            className={inputRegister}
                            onChange={handleChange}
                            id="img"
                            placeholder="Ingrese un URL de su imagen"
                            
                        />
                    </div>
                </div>
                {
                    error.length !== 0 ?
                        <h1 className="text-amber-700 text-xl"> {error.response.data} </h1>
                        :
                        null
                }
                {
                    passwordError ?
                    <h1 className="text-amber-700 text-xl"> Las contraseñas no coinciden </h1>
                    :
                    null
                }
                {
                    loading ?
                        <button disabled className={buttonclass}>
                            <svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                            </svg>
                            Registrarse</button>
                        :
                        <button className={buttonclass}>Registrarse</button>
                }
            </form>
        </div>
    );
}
