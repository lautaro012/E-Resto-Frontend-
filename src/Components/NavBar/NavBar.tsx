import { useNavigate } from 'react-router-dom'
import './NavBar.css'
import SearchBar from '../SearchBar/SearchBar'

export default function NavBar ({el, home}:any) {

    const navigate = useNavigate()

    const handleClick = () => {
        el.current?.scrollIntoView({behavior: 'smooth'});
    }
    const handleHome = () => {
        // home.current?.scrollIntoView({behavior: 'smooth'});
        window.scroll({
            top: 0, 
            left: 0, 
            behavior: 'smooth'
          });
    }
    return (
        <nav className="navbar-conteiner">
            <header>
                <div className='navbar-buttons'>
                    <button onClick={handleHome}> HOME </button>

                    <button onClick={() => navigate('/pedidos')}> HACE TU PEDIDO </button>
                </div>
                <SearchBar></SearchBar>
                <div className='pedidos-navbar-buttons'>
                    <button> Carrito </button>
                    <button onClick={() => navigate('/crear')}> Crear Producto </button>
                </div>
            </header>
        </nav>
    )
}