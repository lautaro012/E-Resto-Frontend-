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
    const [catalogo, setCatalogo] = useState<boolean>(false)


    function closeContacto() {
        setContacto(false)
    }
    function closeCatalogo() {
        setCatalogo(false)
    }


    return (
        <nav className="navbar-conteiner">
            <header>
                <div className='navbar-buttons'>
                    <button style={{color: '#395B64'}} onClick={() => setCatalogo(true)} className={buttonclass}> CATÁLOGO </button>

                    <button style={{color: '#395B64'}} className={buttonclass} onClick={() => navigate('/pedidos')}> HACE TU PEDIDO </button>
                </div>
                <img className='logoHenryFood' src={Logo} alt='LOGO'></img>
                <div className='navbar-buttons'>
                    <button style={{color: '#395B64'}} onClick={() => navigate('/delivery')} className={buttonclass} > SOY REPARTIDOR </button>
                    <button style={{color: '#395B64'}} className={buttonclass} onClick={() => setContacto(true)}> CONTACTANOS </button>
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
            <Modal
                show={catalogo}
                onClose={closeCatalogo}
                size='md'
            >
                <ModalHeader>
                    Accede a nuestro catalógo
                </ModalHeader>
                <ModalBody>
                    <div className='catalogoStyleButton'>
                    <a href='https://www.cervezabaum.com/publicAccess/cab/carta.pdf' target='_blank'><button className={buttonclass} >Accedé a nuestro catálogo</button></a>
                    </div>
                </ModalBody>
                <ModalFooter>
                    © 2022 Henry's Resto Project™
                </ModalFooter>
            </Modal>
        </nav>
    )
}