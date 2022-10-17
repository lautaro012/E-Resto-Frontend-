import { useNavigate } from 'react-router-dom'
import './HomeBar.css'
import Logo from '../../Style/images/Henry.png'
import { buttonclass } from '../../Style/Clases/Clases'
import { useState } from "react";
import { Modal } from 'flowbite-react';
import { ModalBody } from 'flowbite-react/lib/esm/components/Modal/ModalBody';
import { ModalHeader } from 'flowbite-react/lib/esm/components/Modal/ModalHeader';
import { ModalFooter } from 'flowbite-react/lib/esm/components/Modal/ModalFooter';
import ContactForm from '../ContactForm/ContactForm';

export default function HomeBar({ el }: any) {

    const navigate = useNavigate()
    const [contacto, setContacto] = useState<boolean>(false)

    function closeContacto() {
        setContacto(false)
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
                    <button className={buttonclass} onClick={() => setContacto(true)}> CONTACTANOS </button>
                </div>
            </header>
            <Modal
                show={contacto}
                onClose={closeContacto}
                size='3x1'
            >
                <ModalHeader>
                    Contactanos
                </ModalHeader>
                <ModalBody>
                    <ContactForm></ContactForm>
                </ModalBody>
                <ModalFooter>
                    © 2022 Henry's Resto Project™
                </ModalFooter>
            </Modal>
        </nav>
    )
}