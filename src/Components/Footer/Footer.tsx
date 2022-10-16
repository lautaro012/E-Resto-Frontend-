import './Footer.css'
import Subscribe from '../SubscribeButton/Subscribe'
import { Modal } from 'flowbite-react';
import { useState } from "react";
import About from '../About_us/About';
import { ModalFooter } from 'flowbite-react/lib/esm/components/Modal/ModalFooter';

export default function Footer() {

    const [openAbout, setOpenAbout] = useState<boolean>(false)

    function closeAbout() {
        setOpenAbout(false)
    }

    return (

        <div>
            <footer className="p-4 bg-white rounded-lg shadow md:flex md:items-center md:space-around md:p-6 dark:bg-gray-800">
                <span id='colorFooterConfig' className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="/" className="hover:underline">Henry's Resto Project™</a>. Todos los derechos reservados.
                </span>
                <ul id='colorFooterUlConfig' className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <a href="#" onClick={() => setOpenAbout(true)} className="mr-4 hover:underline md:mr-6 ">Sobre Nosotros</a>
                    </li>
                    <li>
                        <a href="/pedidos" className="mr-4 hover:underline md:mr-6">Hacé tu pedido</a>
                    </li>
                    {/* <li>
                        <a href="#" className="hover:underline">Contacto</a>
                    </li> */}
                </ul>
                <span>
                    <Subscribe />
                </span>
                <Modal
                    show={openAbout}
                    onClose={closeAbout}
                    size="8xl"
                    data-aos="fade-up"
                    data-aos-duration="1500"
                >
                    <Modal.Header>
                        The Henry's Resto Project Team !
                    </Modal.Header>
                    <Modal.Body>
                        <About></About>
                    </Modal.Body>
                    <ModalFooter>
                        © 2022 Henry's Resto Project™
                    </ModalFooter>
                </Modal>
            </footer>
        </div>
    )
}