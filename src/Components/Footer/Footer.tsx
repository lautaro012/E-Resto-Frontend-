import './Footer.css'
import {buttonclass} from "../../Style/Clases/Clases"
import { useState } from 'react'
import { useAppDispatch } from '../../config'
import { sendSubscribeMail } from '../../redux/actions'

export function Footer () {
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
              <footer className="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
                <span id='colorFooterConfig' className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="/pedidos" className="hover:underline">Henry's Resto Project™</a>. Todos los derechos reservados.
                </span>
                <ul id='colorFooterUlConfig' className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6 ">Sobre Nosotros</a>
                    </li>
                    <li>
                        <a href="/pedidos" className="mr-4 hover:underline md:mr-6">Hacé tu pedido</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline">Contacto</a>
                    </li>

                </ul>
                <span>
                    <form onSubmit={(event) => handleSubmit(event)}>
                    <input onChange={(e) => handleChange(e)} type="text" placeholder='Tu mail ...'/>
                    <button type='submit' className={buttonclass}>Suscribite</button>
                    </form>
                </span>
            </footer>
            </div>
    )
}