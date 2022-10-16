import React, { useState } from 'react'
import { useAppDispatch } from '../../config'
import { getMailContact } from '../../redux/actions'
import { buttonclass } from '../../Style/Clases/Clases'
import './ContactForm.css'

const ContactForm = () => {
    let dispatch = useAppDispatch()
    
    const [input, setInput] = useState({
        username: '',
        mail: '',
        text: '',
    })

    const handleChange = (e: any) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e:any) => {
        e.preventDefault()
        dispatch(getMailContact(input))
    }

  return (
    <div>
        <form className='divFormContactComponent' onSubmit={e => handleSubmit(e)}>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Email</label>
        <div className="relative mb-6">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
        </div>
        <input onChange={(e) => handleChange(e)} name='mail' required type="email" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@henrysfood.com"/>
        </div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Username</label>
        <div className="flex">
        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            @
        </span>
        <input onChange={(e) => handleChange(e)} name='username' required id="website-admin" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username"/>
        </div>
        <textarea onChange={(e) => handleChange(e)} name='text' required placeholder='Ingrese su consulta aquí' />
        <button type='submit' className={buttonclass}>Enviar</button>
        </form>
    </div>
  )
}

export default ContactForm