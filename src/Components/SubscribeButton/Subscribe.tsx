import React, { useState } from 'react'
import { useAppDispatch } from '../../config'
import { sendSubscribeMail } from '../../redux/actions'
import { buttonclass } from '../../Style/Clases/Clases'

const Subscribe = () => {
    const [mail, setMail] = useState('')
    let dispatch = useAppDispatch()

    function handleChange(event:React.ChangeEvent<HTMLInputElement>) {
        setMail(event.target.value)
    }

    function handleSubmit(event:React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        dispatch(sendSubscribeMail(mail))
        setMail("")
    }
  
    return (
    
    <div>
        <form onSubmit={(event) => handleSubmit(event)}>
            <input onChange={(e) => handleChange(e)} type="text" placeholder='Tu mail ...'/>                    
            <button type='submit' className={buttonclass}>Suscribite</button>
        </form>
    </div>
  )
}

export default Subscribe