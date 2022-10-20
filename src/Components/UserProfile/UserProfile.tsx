import { useAppSelector } from '../../config'
import './UserProfile.css'
import { useState } from 'react'
import DatosPerfil from './DatosPerfil'
import Orders from './Orders/Orders'
import OrderTimeline from '../OrderTimeline/OrderTimeline'
import Testmap from '../Map/TestMap'
import { buttonclass } from '../../Style/Clases/Clases'


export default function Profile() {

    const user2 = useAppSelector((state) => state.user)

    const [render, setRender] = useState("perfil")
    const [idOrden, setIdOrden] = useState(0)
    const [delivery, setDelivery] = useState({})


    function handleRender(componente: string, orden: number = 0) {
        setRender(componente)
        setIdOrden(orden)
    }
    function onMap (mapa:any, deli:any) {
        setRender(mapa)
        setDelivery(deli)
    }
    const user = JSON.parse(JSON.stringify(user2))
    return (
        <div className='Profile'>

            <div className='User_options_conteiner'>
                <div className='shadow-div'>
                    <aside className='User_options'>
                        <div>
                            <h1 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">{user.userName}</h1>
                            <img src={user.img} alt={user.name} />
                        </div>
                        <button className={buttonclass} id='profile_buttons' onClick={() => handleRender("perfil")}>Mi perfil</button>
                        <button className={buttonclass} id='profile_buttons' onClick={() => handleRender("orders")}>Mis compras</button>
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
                                    <OrderTimeline onMap={onMap} idOrden={idOrden} ></OrderTimeline>
                                    :
                                render === 'map' ?
                                    <Testmap delivery={delivery}></Testmap>
                                    :
                                    null

                    }
                </div>
            </div>
        </div>
    )
}