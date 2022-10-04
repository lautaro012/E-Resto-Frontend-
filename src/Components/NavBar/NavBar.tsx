import './NavBar.css'
import { useNavigate } from "react-router-dom";
import SearchBar from '../SearchBar/SearchBar'
import { NavBarProp } from '../../Interfaces/Interfaces';
import { buttonclass } from '../../Style/Clases/Clases';
import Logo from '../../Style/images/Henry.png'
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
                    <a href="#" onClick={handleHome} className="flex items-center">
                        <img id="logoNavBarImg" width={150} src={Logo} alt='LOGO'></img>
                    </a>
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
                    <div className="flex md:order-2">
                        <button onClick={handleCreate} type="button" className={buttonclass}>Crea tu pedido</button>
                    </div>
                    
                </div>
            </nav>
        </div>
    )
}
