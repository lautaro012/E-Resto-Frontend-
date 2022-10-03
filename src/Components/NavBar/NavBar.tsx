import './NavBar.css'
import { useNavigate } from "react-router-dom";
import SearchBar from '../SearchBar/SearchBar'
import { NavBarProp } from '../../Interfaces/Interfaces';
import { buttonclass } from '../../Style/Clases/Clases';
import Logo from '../../Style/images/Henry.png'

export default function NavBar({ setShowModal, setcreateProduct, seteditProduct }: NavBarProp) {

    const navigate = useNavigate();

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
                    <div className="flex md:order-2">
                        <button onClick={handleCreate} type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Crea tu pedido</button>
                    </div>

                </div>
            </nav>
        </div>
    )
}
