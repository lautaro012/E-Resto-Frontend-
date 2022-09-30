import './NavBar.css'
import { useNavigate } from "react-router-dom";
import SearchBar from '../SearchBar/SearchBar'
import { NavBarProp } from '../../Interfaces/Interfaces';


export default function NavBar({ comeback }: NavBarProp) {
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
    return (
        <>
        {
            comeback ?
            <nav className="pedidos-navbar-conteiner">
                <button onClick={() => navigate('/pedidos')}> {'<'} </button>
           
            </nav>
            :
            <nav className="pedidos-navbar-conteiner">
            <header>
                <button onClick={handleHome}><img width={150} src='http://www.occohelados.com.ar/_nuxt/img/logo.18d63ee.png' alt='LOGO'></img></button>
                <div>
                    <h1>DIETA</h1>
                </div>
                <SearchBar></SearchBar>
                <div className='pedidos-navbar-buttons'>
                   
                    <button onClick={() => navigate('/crear')}> Crear Producto </button>
                </div>
                </header>
            </nav>
        }
        </>  
)
}