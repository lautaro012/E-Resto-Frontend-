import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../config";
import { StateTypes } from "../../Interfaces/Interfaces";
import { aNavbar } from "../../Style/Clases/Clases";
//import { useNavigate } from "react-router-dom";
import { Modal } from "flowbite-react";
import Admin from "../Admin/Admin";
import Profile from "../UserProfile/UserProfile";
import { clearUser } from "../../redux/actions";
import './NavBar.css'


export default function Panel({ menuResponsive, setMenuResponsive }: any) {
    let dispatch = useAppDispatch()
    let user = useAppSelector((state: StateTypes) => state.user);
    const [open, setOpen] = useState<boolean>(true);
    const [openAdmin, setOpenAdmin] = useState<boolean>(false)
    const [openUser, setOpenUser] = useState<boolean>(false)

    //const navigate = useNavigate();

    const handleUser = () => {
        open ? setOpen(false) : setOpen(true);
    };

    const handleLogout = () => {
        localStorage.setItem("token", JSON.stringify([]));
        dispatch(clearUser())
        setMenuResponsive(true)
        window.location.reload()
    };

    const handleResponsive = () => {
        menuResponsive ? setMenuResponsive(false) : setMenuResponsive(true);
    };

    function handlePanel(string: string) {
        if (string === "/admin") {
            setOpenAdmin(true)
        }
        if (string === "/user") {
            setOpenUser(true)
        }
    }

    function closeAdmin() {
        setOpenAdmin(false)
    }

    function closeUser() {
        setOpenUser(false)
    }

    return (
        <div className="flex items-center md:order-2">
            <button
                onClick={handleUser}
                type="button"
                className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
            >
                <span className="sr-only">Open user menu</span>
                <img className="w-16 h-16 rounded-full" src={user.img} alt="user" />
                <h1 className="h1-button-user">{user.name} {user.lastName}</h1>
            </button>
            {/* <!-- Dropdown menu --> */}
            <div
                hidden={open}
                className=" absolute top-20 z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                id="user-dropdown"
            >
                <div className="py-3 px-4">
                    <span className="block text-sm text-gray-900 dark:text-white">
                        {user.name} {user.lastName}
                    </span>
                    <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                        {user.mail}
                    </span>
                </div>
                <ul className="py-1" aria-labelledby="user-menu-button">
                    {
                        user && user.admin === true ?
                            <div>
                                <li>
                                    <button className={aNavbar} onClick={() => handlePanel('/admin')} type="button">
                                        Perfil de admin
                                    </button>
                                </li>
                                <Modal
                                    show={openAdmin}
                                    onClose={closeAdmin}
                                    size="7xl"
                                    data-aos="fade-right"
                                    data-aos-duration="500"
                                >
                                    <Modal.Header>
                                        Perfil de admin
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Admin></Admin>
                                    </Modal.Body>
                                </Modal>
                            </div>
                            :
                            <div>
                                <li>
                                    <button className={aNavbar} onClick={() => handlePanel('/user')} type="button">
                                        Perfil de usuario
                                    </button>
                                </li>
                                <Modal
                                    show={openUser}
                                    onClose={closeUser}
                                    size="7xl"
                                    data-aos="fade-left"
                                    data-aos-duration="500"
                                >
                                    <Modal.Header>
                                        Perfil de usuario
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Profile></Profile>
                                    </Modal.Body>
                                </Modal>
                            </div>
                    }
                    <li>
                        <button
                            className={aNavbar}
                            onClick={handleLogout}>
                            Cerrar sesion
                        </button>
                    </li>
                </ul>
            </div>
            <button
                onClick={handleResponsive}
                data-collapse-toggle="mobile-menu-2"
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="mobile-menu-2"
                aria-expanded="false"
            >
                <span className="sr-only">Open main menu</span>
                <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clip-rule="evenodd"
                    ></path>
                </svg>
            </button>
        </div>
    )
}