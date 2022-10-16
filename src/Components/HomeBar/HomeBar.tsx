import { useNavigate } from 'react-router-dom'
import './HomeBar.css'
import Logo from '../../Style/images/Henry.png'
import { buttonclass } from '../../Style/Clases/Clases'
import { useState } from "react";
import { Modal } from 'flowbite-react';
import { ModalBody } from 'flowbite-react/lib/esm/components/Modal/ModalBody';
import { ModalHeader } from 'flowbite-react/lib/esm/components/Modal/ModalHeader';
import { ModalFooter } from 'flowbite-react/lib/esm/components/Modal/ModalFooter';

export default function HomeBar({ el }: any) {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/contacto');
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

                    <button className={buttonclass} onClick={() => navigate('/pedidos')}> HACE TU PEDIDO </button>
                </div>
                <img className='logoHenryFood' src={Logo} alt='LOGO'></img>
                <div className='navbar-buttons'>
                    <button onClick={() => navigate('/delivery')} className={buttonclass} > SOY REPARTIDOR </button>
                    <button className={buttonclass} onClick={handleClick}> CONTACTANOS </button>
                </div>
            </header>
        </nav>
    )
}