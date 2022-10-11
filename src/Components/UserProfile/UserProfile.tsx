//import { useEffect } from 'react'
import { useAppSelector } from '../../config'
import './UserProfile.css'
import { useState } from 'react'
//import { getUser } from '../../redux/actions'
import DatosPerfil from './DatosPerfil'
import Orders from './Orders'

export default function Profile() {

    //let dispatch = useAppDispatch()

    const user = useAppSelector((state) => state.user)

    // const token = JSON.parse(localStorage.getItem("token")!);

    // useEffect(() => {
    //     dispatch(getUser(token))
    // }, [dispatch])

    const [render, setRender] = useState("perfil")

    function handleRender(componente: string) {
        setRender(componente)
    }

    return (
        <div className='Profile'>

            <div className='User_options_conteiner'>
                <aside className='User_options'>
                    <div>
                        <h1>Bienvenido {user.name}</h1>
                        <img src={user.img} alt={user.name} />
                    </div>
                    <button id='profile_buttons' onClick={() => handleRender("perfil")}>Mi perfil</button>
                    <button id='profile_buttons' onClick={() => handleRender("orders")}>Mis compras</button>
                    {/* <button id='profile_buttons' onClick={() => handleRender("favoritos")}>Favoritos</button> */}
                </aside>
            </div>

            <div className='User_data_conteiner'>
                <div className='User_data'>
                    {
                        render && render === "perfil" ?
                            <DatosPerfil data={user}></DatosPerfil>
                            :
                            render === "orders"?
                            <Orders></Orders>
                            :
                            null
                    }
                </div>
            </div>
        </div>
    )
}