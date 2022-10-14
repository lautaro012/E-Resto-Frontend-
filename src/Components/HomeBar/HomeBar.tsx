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
    const [deliveryModal, setDeliveryModal] = useState<boolean>(false)

    const handleClick = () => {
        el.current?.scrollIntoView({ behavior: 'smooth' });
    }
    const handleHome = () => {
        // home.current?.scrollIntoView({behavior: 'smooth'});
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    function closeDelilveryModal() {
        setDeliveryModal(false)
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
                    <button className={buttonclass} > CATALOGO </button>
                    <button onClick={() => setDeliveryModal(true)} className={buttonclass} > Soy delivery </button>
                    <button className={buttonclass} onClick={handleClick}> CONTACTANOS </button>
                </div>
            </header>
            <Modal
                show={deliveryModal}
                onClose={closeDelilveryModal}
            >
                <ModalHeader></ModalHeader>
                <ModalBody>
                    <h1>Loggin Delivery</h1>
                </ModalBody>
                <ModalFooter></ModalFooter>
            </Modal>
        </nav>
    )
}