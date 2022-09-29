import NavBar from "../NavBar/NavBar"
import './Home.css'
import Logo from '../../Style/images/logo.jpg'
import { Footer } from "../Footer/Footer"
import Products from "../Products/Products"
import { useRef } from "react"


export default function Home () {

    const home = useRef<null | HTMLImageElement>(null);

    const el = useRef<null | HTMLDivElement>(null);

    return (
        <div className="home-conteiner">
            <header>
            <NavBar el={el} home={home}/>
            <div className="logo-conteiner" >
                <img ref={home} width={400} src={Logo} alt='logo'/>
            </div>
            </header>
            <div>
                <Products/>
            </div>
            <div ref={el}>
                <Footer/>
            </div>
        </div>
    )
}