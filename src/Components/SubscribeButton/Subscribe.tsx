import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../config'
import { StateTypes } from '../../Interfaces/Interfaces'
import { sendSubscribeMail } from '../../redux/actions'
import { buttonclass } from '../../Style/Clases/Clases'

const Subscribe = () => {

    let user = useAppSelector((state: StateTypes) => state.user);

    const [mail, setMail] = useState('')
    let dispatch = useAppDispatch()

    function handleChange(event:React.ChangeEvent<HTMLInputElement>) {
        setMail(event.target.value)
    }

    function handleSubmit(event:React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if(user) {
            dispatch(sendSubscribeMail(user.mail))
        } else {
            dispatch(sendSubscribeMail(mail))
        }
        setMail("")
    }
  
    return (
    
    <div>
        <form onSubmit={(event) => handleSubmit(event)}>
        {
        user?.mail ?           
            <button type='submit' className={buttonclass}>Suscribite</button>
        :
        <div>   
            <input onChange={(e) => handleChange(e)} type="text" placeholder='Tu mail ...'/>                    
            <button type='submit' className={buttonclass}>Suscribite</button>
        </div>
        }
        </form>
    </div>
  )
}

export default Subscribe