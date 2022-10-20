import { Button } from 'flowbite-react'
import { Link } from "react-scroll";

export default function ProducCard({ item, h1, to }: any) {

    return (
        <div className='elemento_carrousel'>
            <img src={item} alt={h1} className="imagen_carrousel_main"></img>
            <h1 id='h1_imagen_carrousel'>{h1}</h1>
            <Link
                activeClass="active"
                to={to}
                spy={true}
                smooth={true}
                duration={2000}
                offset={-70}
            >
                <button id='button_verMas'>Ver mas</button>
            </Link>
        </div>
    )
}