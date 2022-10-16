import React, { useEffect, useState } from 'react'
import './Admin.css'

import { useAppDispatch, useAppSelector } from '../../../config'
import { changeBanUser, changeNoBanUser, changeUserAsAdmin, getAllUsers } from '../../../redux/actions'
import { buttonclass, listUsuariosRegistrados, mailUsuarioRegistrado, nameUsuarioRegistrado, titleUsuariosRegistrados } from '../../../Style/Clases/Clases'

const UserList = (render : any) => {
    let dispatch = useAppDispatch()
    const users = useAppSelector((state) => state.allUsers)
    const [prueba, setPrueba] = useState('')
    
    const getRandom = () => {
        let num = Math.random()*Math.random()
        return num.toString()
    }

    const handleBan = (e : any) => {
        dispatch(changeBanUser(e.target.value))
        setPrueba(getRandom())
    }
    
    const handleAdmin = (e: any) => {
        dispatch(changeUserAsAdmin(e.target.value))
        setPrueba(getRandom())
    }

    const undoBanUser = (e:any) => {
        dispatch(changeNoBanUser(e.target.value))
        setPrueba(getRandom())

    } 

// console.log(users)
    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch, prueba])

    



  return (
    <div>
    <div id='sizingDivAdmin'>
        <div className="flex justify-between items-center mb-4">
            <h5 className={titleUsuariosRegistrados}>Usuarios Registrados</h5>
        </div>
        {
                render.render === 'registeredUsers' ?
                users?.filter((e : any) => e.baneado === false)
                .filter((e:any) => e.admin === false)
                .map((user : any) => {
                    return (
                        
                        <div className="flow-root" key={user._id}>
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
                                                <button onClick={(e) => {handleBan(e)}} value={user._id} className={buttonclass}>Banear</button>
                                                <button className={buttonclass} value={user._id} onClick={(e) => handleAdmin(e)}>Hacer Admin</button>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                        </div>
                    )
                    })
        : 
        render.render === 'bannedUsers' ? 

        users?.filter((e : any) => e.baneado === true)
        .map((user : any) => {
            return (
                <div className="flow-root" key={user._id}>
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
                                        <button onClick={(e) => {undoBanUser(e)}} value={user._id} className={buttonclass}>Deshacer Baneo</button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                </div>

                ) 
            })
        
        :

        users?.filter((e : any) => e.admin === true && e.baneado === false)
        .map((user : any) => {
            return (
                <div className="flow-root" key={user._id}>
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
                                    <button onClick={(e) => {handleBan(e)}} value={user._id} className={buttonclass}>Banear Usuario</button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                </div>

                ) 
            
            })
            
        
        
        }
    </div>
        
    </div>
    )
}

export default UserList