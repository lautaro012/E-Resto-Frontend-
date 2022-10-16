import React, { useState } from 'react'
import swal from 'sweetalert'
import { useAppDispatch } from '../../../config'
import { createNewDelivery } from '../../../redux/actions'
import { buttonclass, headerRegisterDelivery, inputRegisterDelivery } from '../../../Style/Clases/Clases'
import './DeliveryRegister.css'

const DeliveryRegister = () => {
    let dispatch = useAppDispatch()
    const [secondPass, setSecondPass] = useState('')
    const [input, setInput] = useState<any>({
        name: '',
        lastName: '',
        mail: '',
        password: ''
    })

    const handleChange = (e:any) => {
          setSecondPass(e.target.value)
      };

    const handleInput = (e:any) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
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
    <div className='divDeliveryRegister'>
        <h3 className={headerRegisterDelivery}>Registrar nuevo repartidor</h3>
        <form className='formRegisterDeliveryStyle' onSubmit={handleSubmit}>
            <input onChange={e => handleInput(e)} required name='name' type="text" placeholder='Ingrese nombre aquí' className={inputRegisterDelivery} ></input> 
            <input onChange={e => handleInput(e)} required name='lastName' type="text" placeholder='Ingrese apellido aquí' className={inputRegisterDelivery} ></input> 
            <div className="relative mb-6" id='divMailInput'>
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
            </div>
            <input required type="email" name='mail' onChange={e => handleInput(e)} className={inputRegisterDelivery} placeholder="name@henrysfood.com"/>
            </div>            
            <input required onChange={e => handleInput(e)} name='password' type="password" placeholder='Ingrese la contraseña aquí' className={inputRegisterDelivery} ></input> 
            <input required onChange={e => handleChange(e)} name='repeatPass' type="password" placeholder='Repita la contraseña' className={inputRegisterDelivery} ></input> 
            <button type='submit' className={buttonclass}>Registrar repartidor</button>
        </form>
    </div>
  )
}

export default DeliveryRegister