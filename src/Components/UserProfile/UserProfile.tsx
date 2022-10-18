import { useAppSelector } from '../../config'
import './UserProfile.css'
import { useState } from 'react'
import DatosPerfil from './DatosPerfil'
import Orders from './Orders/Orders'
import { Button } from 'flowbite-react'
import OrderTimeline from '../OrderTimeline/OrderTimeline'


export default function Profile() {

    const user = useAppSelector((state) => state.user)

    const [render, setRender] = useState("perfil")
    const [idOrden, setIdOrden] = useState(0)

    function handleRender(componente: string, orden: number = 0) {
        setRender(componente)
        setIdOrden(orden)
    }

    return (
        <div className='Profile'>

            <div className='User_options_conteiner'>
                <div className='shadow-div'>
                    <aside className='User_options'>
                        <div>
                            <h1 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">{user.userName}</h1>
                            <img src={user.img} alt={user.name} />
                        </div>
                        <Button id='profile_buttons' onClick={() => handleRender("perfil")}>Mi perfil</Button>
                        <Button id='profile_buttons' onClick={() => handleRender("orders")}>Mis compras</Button>
                    </aside>
                </div>
            </div>
            <div className='User_data_conteiner'>
                <div className='User_data'>
                    {
                        render && render === "perfil" ?
                            <DatosPerfil data={user}></DatosPerfil>
                            :
                            render === "orders" ?
                                <Orders handleRender={handleRender} ></Orders>
                                :
                                render === 'detail' ?
                                    <OrderTimeline idOrden={idOrden} ></OrderTimeline>
                                    :
                                    null
                    }
                </div>
            </div>
        </div>
    )
}