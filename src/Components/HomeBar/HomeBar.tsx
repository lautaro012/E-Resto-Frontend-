import { useNavigate } from 'react-router-dom'
import './HomeBar.css'
import Logo from '../../Style/images/Henry.png'
import { buttonclass } from '../../Style/Clases/Clases'

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
                    <button onClick={handleHome} className={buttonclass}> HOME </button>

                    <button className={buttonclass}  onClick={() => navigate('/pedidos')}> HACE TU PEDIDO </button>
                </div>
                <img className='logoHenryFood' src={Logo} alt='LOGO'></img>
                <div className='navbar-buttons'>
                    <button className={buttonclass} > CATALOGO </button>

                    <button className={buttonclass}  onClick={handleClick}> CONTACTANOS </button>
                </div>
            </header>
        </nav>
    )
}