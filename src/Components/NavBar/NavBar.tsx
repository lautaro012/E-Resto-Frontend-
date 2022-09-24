import { useNavigate } from 'react-router-dom'
import './NavBar.css'
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
                <img src='http://www.occohelados.com.ar/_nuxt/img/logo.18d63ee.png' alt='LOGO'></img>
                <div className='navbar-buttons'>
                    <button> CATALOGO </button>

                    <button onClick={handleClick}> CONTACTANOS </button>
                </div>
            </header>
        </nav>
    )
}