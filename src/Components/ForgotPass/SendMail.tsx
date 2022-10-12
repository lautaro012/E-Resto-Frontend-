import React, {useState } from 'react'
import { useAppDispatch } from '../../config'
import { sendResetPassMail } from '../../redux/actions'
import { buttonclass } from '../../Style/Clases/Clases'
import './Pass.css'

const SendMail = () => {
    let dispatch = useAppDispatch()
    const [mail, setMail] = useState('')
    
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setMail(
         e.target.value,
        );
    };

    function handleSubmit(event:React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        dispatch(sendResetPassMail(mail))
        setMail("")
    }



return (
    <div className='pruebaDivCenter'>
        <div className='divFormPass'>  
        <p>Te enviaremos un mail a tu casilla de correo para recuperar tu cuenta</p>
        <form className='formPassReset' onSubmit={(e) => handleSubmit(e)}>
            <input onChange={(e) => handleChange(e)} placeholder='name@henrysfood.com' type="text" required/>
            <button type='submit' className={buttonclass}>Recibir enlace por mail</button>
        </form>

        </div>
    </div>
   
)
}

export default SendMail