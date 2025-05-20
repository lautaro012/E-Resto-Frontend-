import  { useEffect } from 'react'
import './Admin.css'
import { useAppDispatch, useAppSelector } from '../../../config'
import { changeBanUser, changeNoBanUser, changeUserAsAdmin, getAllUsers } from '../../../redux/actions'
import { buttonclass, listUsuariosRegistrados, mailUsuarioRegistrado, nameUsuarioRegistrado, titleUsuariosRegistrados } from '../../../Style/Clases/Clases'

function UserList(render: any) {

    let dispatch = useAppDispatch()
    const users = useAppSelector((state) => state.allUsers)

    const handleBan = (e: any) => {
        dispatch(changeBanUser(e.target.value))
    }

    const handleAdmin = (e: any) => {
        dispatch(changeUserAsAdmin(e.target.value))
    }

    const undoBanUser = (e: any) => {
        dispatch(changeNoBanUser(e.target.value))
    }

    useEffect(() => {
        dispatch(getAllUsers())
    }, [])
    function effecto(){
        console.log('effecto');
        
    }

    return (
        <div data-aos="fade-left" data-aos-duration="500">
            <div id='sizingDivAdmin'>
                {
                    render.render === 'registeredUsers' ?
                        <div data-aos="fade-left" data-aos-duration="500">
                            <div className="flex justify-between items-center mb-4">
                                <h5 className={titleUsuariosRegistrados}>Usuarios Registrados</h5>
                            </div>
                            {
                                users?.filter((e: any) => e.baneado === false)
                                    .filter((e: any) => e.admin === false)
                                    .map((user: any) => {
                                        return (
                                            <div className="flow-root" key={user._id} data-aos="fade-left" data-aos-duration="500">
                                                <ul role="list" className={listUsuariosRegistrados}>
                                                    <li className="py-3 sm:py-4">
                                                        <div className="flex items-center space-x-4">
                                                            <div className="flex-shrink-0">
                                                                <img className="w-8 h-8 rounded-full" src={user.img} alt="User image" />
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
                                                                <button onClick={(e) => { handleBan(e) }} value={user._id} className={buttonclass}>Banear</button>
                                                                <button className={buttonclass} value={user._id} onClick={(e) => handleAdmin(e)}>Hacer Admin</button>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        )
                                    })
                            }
                        </div>
                        :
                        render.render === 'bannedUsers' ?
                            <div data-aos="fade-left" data-aos-duration="500">
                                <div className="flex justify-between items-center mb-4">
                                    <h5 className={titleUsuariosRegistrados}>Usuarios baneados</h5>
                                </div>
                                {
                                    users?.filter((e: any) => e.baneado === true)
                                        .map((user: any) => {
                                            return (
                                                <div className="flow-root" key={user._id} data-aos="fade-left" data-aos-duration="500">
                                                    <ul role="list" className={listUsuariosRegistrados}>
                                                        <li className="py-3 sm:py-4">
                                                            <div className="flex items-center space-x-4">
                                                                <div className="flex-shrink-0">
                                                                    <img className="w-8 h-8 rounded-full" src={user.img} alt="User image" />
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
                                                                    <button onClick={(e) => { undoBanUser(e) }} value={user._id} className={buttonclass}>Deshacer Baneo</button>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>

                                            )
                                        })
                                }
                            </div>
                            :
                            <div data-aos="fade-left" data-aos-duration="500">
                                <div className="flex justify-between items-center mb-4">
                                    <h5 className={titleUsuariosRegistrados}>Administradores</h5>
                                </div>
                                {
                                    users?.filter((e: any) => e.admin === true && e.baneado === false)
                                        .map((user: any) => {
                                            return (
                                                <div className="flow-root" key={user._id} data-aos="fade-left" data-aos-duration="500">
                                                    <ul role="list" className={listUsuariosRegistrados}>
                                                        <li className="py-3 sm:py-4">
                                                            <div className="flex items-center space-x-4">
                                                                <div className="flex-shrink-0">
                                                                    <img className="w-8 h-8 rounded-full" src={user.img} alt="User image" />
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
                                                                    <button onClick={(e) => { handleBan(e) }} value={user._id} className={buttonclass}>Banear Usuario</button>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>

                                            )
                                        })
                                }
                            </div>
                }
            </div>

        </div>
    )
}

export default UserList