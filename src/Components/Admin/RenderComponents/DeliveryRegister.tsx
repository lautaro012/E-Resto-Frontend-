import React, { useState } from 'react'
import swal from 'sweetalert'
import { useAppDispatch } from '../../../config'
import { createNewDelivery } from '../../../redux/actions'
import { buttonclass, headerRegisterDelivery, inputRegisterDelivery } from '../../../Style/Clases/Clases'
import './DeliveryRegister.css'

const DeliveryRegister = () => {
    let dispatch = useAppDispatch()
    const [secondPass, setSecondPass] = useState('')
    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState<any>({
        name: '',
        lastName: '',
        mail: '',
        password: '',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW2zB9ZfnqjeJkkgqMS7zen-NVpatbD9U3tiEirtof0QIA8Cx3ApChLYPJO9hVdncSkrA&usqp=CAU',
    })

    const handleChange = (e: any) => {
        setSecondPass(e.target.value)
    };

    const handleInput = (e: any) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    const handleOnImageChange = (e: any) => {
        if (e.target.files && e.target.files[0]) {
            setLoading(true)
            const data = new FormData()
            data.append("file", e.target.files[0])
            data.append("upload_preset", "FoodHen")
            fetch(
                "https://api.cloudinary.com/v1_1/luubermudezz/image/upload", {
                method: "POST",
                body: data
                // mode: 'no-cors'
            }
            ).then(resp => resp.json())
                .then(file => {
                    if (file) {
                        setInput({
                            ...input,
                            img: `${file.secure_url}`
                        })
                        setLoading(false)
                    }
                })

        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()

        if (input.password !== secondPass) {
            swal('Las contraseñas no coinciden')
        }
        else {
            dispatch(createNewDelivery(input))
        }

    }

    return (
        <div className='divDeliveryRegister' data-aos="fade-left" data-aos-duration="500">
            <h3 className={headerRegisterDelivery}>Registrar nuevo repartidor</h3>
            <div className="image-subida2">
                <img src={input.img} alt='test-img' />
            </div>
            
            <form className='formRegisterDeliveryStyle' onSubmit={handleSubmit}>
            
                <input onChange={e => handleInput(e)} required name='name' type="text" placeholder='Ingrese nombre aquí' className={inputRegisterDelivery} ></input>
                <input onChange={e => handleInput(e)} required name='lastName' type="text" placeholder='Ingrese apellido aquí' className={inputRegisterDelivery} ></input>
                <div className="relative mb-6" id='divMailInput'>
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                    </div>
                    <input required type="email" name='mail' onChange={e => handleInput(e)} className={inputRegisterDelivery} placeholder="name@henrysfood.com" />
                </div>
                <input required onChange={e => handleInput(e)} name='password' type="password" placeholder='Ingrese la contraseña aquí' className={inputRegisterDelivery} ></input>
                <input required onChange={e => handleChange(e)} name='repeatPass' type="password" placeholder='Repita la contraseña' className={inputRegisterDelivery} ></input>
                <input required onChange={e => handleOnImageChange(e)} name='img' type='file'/>
                {loading ? <button type='submit' disabled className={buttonclass}>
                            <svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                            </svg>
                            Registrar Repartidor</button> :
                <button type='submit' className={buttonclass}>Registrar repartidor</button>}
            </form>
        </div>
    )
}

export default DeliveryRegister