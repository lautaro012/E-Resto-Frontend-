import './NavBar.css'
import { useNavigate } from "react-router-dom";
import SearchBar from '../SearchBar/SearchBar'


export default function NavBar () {
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
        <nav className="pedidos-navbar-conteiner">
            <header>
                <button onClick={handleHome}><img width={150} src='http://www.occohelados.com.ar/_nuxt/img/logo.18d63ee.png' alt='LOGO'></img></button>
                <div>
                    <h1>DIETA</h1>
                </div>
                <SearchBar></SearchBar>
                <div className='pedidos-navbar-buttons'>
                    <button> Carrito </button>
                    <button> Log in </button>
                </div>
            </header>
        </nav>
)
}