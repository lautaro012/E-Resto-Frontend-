import './NavBar.css'
import { useNavigate } from "react-router-dom";
import SearchBar from '../SearchBar/SearchBar'
import { NavBarProp } from '../../Interfaces/Interfaces';
import { buttonclass } from '../../Style/Clases/Clases';
import Logo from '../../Style/images/Henry.png'
import { Link } from "react-router-dom";
import { useState } from 'react';
import Loggin from '../LogginForm/Loggin';


export default function NavBar({ setShowModal, setcreateProduct, seteditProduct }: NavBarProp) {

    const navigate = useNavigate();

    const [showLoggin, setShowLoggin] = useState<boolean>(false);
    const openlog = () => {
        showLoggin ? setShowLoggin(false) : setShowLoggin(true);
    };
    const handleHome = () => {
        // home.current?.scrollIntoView({behavior: 'smooth'});
        navigate('/')
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }
    const handleCreate = () => {
        seteditProduct(false)
        setcreateProduct(true)
        setShowModal(true)
    }
    return (
        <div id='navBar'>
            <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
                <div className="container flex flex-wrap justify-between items-center mx-auto">
                    <button onClick={handleHome} className="flex items-center">
                        <img id="logoNavBarImg" width={150} src={Logo} alt='LOGO'></img>
                    </button>
                    <SearchBar />
                    {
                        showLoggin ?
                            <Loggin
                                openlog={openlog}
                                showLoggin={showLoggin}
                            />
                            :
                            null
                    }
                    <div className="flex md:order-2">
                        <button onClick={openlog} className={buttonclass}> Iniciar Sesión </button>
                    </div>

                    <Link to={"/cart"}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    </Link>

                    <div className="flex md:order-2">
                        <button onClick={handleCreate} type="button" className={buttonclass}>Crea tu pedido</button>
                    </div>
                </div>
            </nav>
        </div>
    )
}
