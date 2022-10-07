import { useState } from "react"
import { useAppSelector } from "../../config"
import { StateTypes } from "../../Interfaces/Interfaces"

export default function UserMenu() {
    const [open, setOpen] = useState<boolean>(false)
    const handleUser = () => {
        open ? setOpen(false) : setOpen(true)
    }

    const handleLogout = () => {
        localStorage.setItem("token", JSON.stringify([]))
        window.location.reload()
    }
    let user = useAppSelector((state: StateTypes) => state.user);

    return (
        <div className="usermenu-conteiner">
            <div className="flex flex-col items-center md:order-2">
                <button onClick={handleUser} type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                    <span className="sr-only">Open user menu</span>
                    <img className="w-8 h-8 rounded-full" src={user.img} alt="user"/>
                </button>
                
                <div hidden={open} className="z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                    <div className="py-3 px-4">
                        <span className="block text-sm text-gray-900 dark:text-white"> {user.name} {user.lastName} </span>
                        <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">{user.mail}</span>
                    </div>
                    <ul className="py-1" aria-labelledby="user-menu-button">
                        <li >
                            Profile
                        </li>
                        <li>
                            Mis pedidos
                        </li>
                        <li>
                            Favoritos
                        </li>
                        <li>
                            <button className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" onClick={handleLogout}>
                                Cerrar sesion
                            </button>
                        </li>
                    </ul>
                </div>
                <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                </button>
            </div>
        </div>
    )
}