import React, { useEffect } from 'react'
import './Admin.css'

import { useAppDispatch, useAppSelector } from '../../../config'
import { getAllUsers } from '../../../redux/actions'
import { buttonclass, firstDiv, listUsuariosRegistrados, mailUsuarioRegistrado, nameUsuarioRegistrado, titleUsuariosRegistrados } from '../../../Style/Clases/Clases'

const UserList = () => {
    let dispatch = useAppDispatch()
    const users = useAppSelector((state) => state.allUsers)
    
    console.log(users)

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])



  return (
    <div>
    <div id='sizingDivAdmin'>
        <div className="flex justify-between items-center mb-4">
            <h5 className={titleUsuariosRegistrados}>Usuarios Registrados</h5>
        </div>
        {users?.map((user : any) => {
            return (
                
                <div className="flow-root">
                        <ul role="list" className={listUsuariosRegistrados}>
                            <li className="py-3 sm:py-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <img className="w-8 h-8 rounded-full" src={user.img} alt="User image"/>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className={nameUsuarioRegistrado}>
                                            {user.userName}
                                        </p>
                                        <p className={mailUsuarioRegistrado}>
                                            {user.mail}
                                        </p>
                                    </div>
                                    <div>
                                        <button className={buttonclass}>Banear</button>
                                        <button className={buttonclass}>Hacer Admin</button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                </div>
            )
        })}
    </div>
        
    </div>
    )
}

export default UserList