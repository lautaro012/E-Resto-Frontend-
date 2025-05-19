import HomeBar from '../HomeBar/HomeBar'
import './Home.css'
import Logo from '../../Style/images/logo-resto.png'
import Products from "../Products/Products"
import { useRef } from "react"


export default function Home() {

    const home = useRef<null | HTMLImageElement>(null);

    const el = useRef<null | HTMLDivElement>(null);

    return (
        <div className="home-conteiner">
            <header>
                <HomeBar el={el} home={home} />
            </header>
            <div className="hero-text" data-aos="fade-up" data-aos-duration="2000">
                <img id='logo_home' ref={home} src={Logo} alt='logo' />
                <h1>Delightful Experience</h1>
                <p>A taste of perfection in every dish – fine dining with a modern twist.</p>
            </div>

           {/* 
            <div className="logo-conteiner" data-aos="fade-up" data-aos-duration="3000">
                <img id='logo_home' ref={home} width={400} src={Logo} alt='logo' />
                <br />
            </div>
            */}

            <Products />

            <div ref={el}>
            </div>
        </div>
    )
}