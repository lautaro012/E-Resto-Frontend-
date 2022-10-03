import { useNavigate } from 'react-router-dom'
import './HomeBar.css'
import Logo from '../../Style/images/Henry.png'

export default function HomeBar ({el, home}:any) {

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
                <img src={Logo} alt='LOGO'></img>
                <div className='navbar-buttons'>
                    <button> CATALOGO </button>

                    <button onClick={handleClick}> CONTACTANOS </button>
                </div>
            </header>
        </nav>
    )
}