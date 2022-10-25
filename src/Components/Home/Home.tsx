import HomeBar from '../HomeBar/HomeBar'
import './Home.css'
import Logo from '../../Style/images/Henry_icon.png'
//import { Footer } from "../Footer/Footer"
import Products from "../Products/Products"
import { useRef } from "react"
import { Modal } from 'flowbite-react'


export default function Home() {

    const home = useRef<null | HTMLImageElement>(null);

    const el = useRef<null | HTMLDivElement>(null);

    return (
        <div className="home-conteiner">
            <header>
                <HomeBar el={el} home={home} />
            </header>
            <div className="logo-conteiner" data-aos="fade-up" data-aos-duration="3000">
                <img id='logo_home' ref={home} width={400} src={Logo} alt='logo' />
                <br />
            </div>

            <Products />

            <div ref={el}>
            </div>
        </div>
    )
}