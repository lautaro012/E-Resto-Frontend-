import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { buttonclass } from "../../Style/Clases/Clases";
import { useEffect, useState } from "react";
import Loggin from "../LogginForm/Loggin";
import { useAppDispatch, useAppSelector } from "../../config";
import { getUser } from "../../redux/actions";
import {  Modal } from "flowbite-react";
import Cart from "../Cart/Cart";
import Panel from "./Panel";
import { ModalHeader } from "flowbite-react/lib/esm/components/Modal/ModalHeader";
import { ModalBody } from "flowbite-react/lib/esm/components/Modal/ModalBody";
import { ModalFooter } from "flowbite-react/lib/esm/components/Modal/ModalFooter";
import SendMail from "../ForgotPass/SendMail";
import Register from "../RegisterForm/RegisterForm";
import ContactForm from "../ContactForm/ContactForm";
import Logo from "../../Style/images/logo-resto.png";

export default function NavBar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showLoggin, setShowLoggin] = useState<boolean>(false);
  const [openCart, setOpenCart] = useState<boolean | undefined>(false)
  const [menuResponsive, setMenuResponsive] = useState<boolean>(true);
  const [forgotPW, setForgotPW] = useState<boolean>(false)
  const [openRegister, setOpenRegister] = useState<boolean>(false)
  const [contacto, setContacto] = useState<boolean>(false)

  function closeContacto() {
    setContacto(false)
  }

  const items = useAppSelector((state) => state.cart)

  let token: any = localStorage.getItem("token");

  const openlog = () => {
    showLoggin ? setShowLoggin(false) : setShowLoggin(true);
  };

  const handleHome = () => {
    // home.current?.scrollIntoView({behavior: 'smooth'});
    navigate("/");
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  //  console.log(menuResponsive);

  useEffect(() => {
    dispatch(getUser(JSON.parse(token)))
  }, []);

  function closeCart() {
    setOpenCart(false)
  }

  function closeForgotPW() {
    setForgotPW(false)
  }

  function closeRegister() {
    setOpenRegister(false)
  }

  return (
    <nav className="bg-background duration-500 border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900" id="navBar">
      <div className="container flex flex-wrap justify-evenly items-center mx-auto">
        <button onClick={handleHome} className="flex items-center">
          <img id="logoNavBarImg" width={80} src={Logo} alt="LOGO"></img>
        </button>

        {/* Modal carrito */}
        <Modal
          show={openCart}
          onClose={closeCart}
          size="7xl"
          data-aos="zoom-in-up"
          data-aos-duration="500"
        >
          <Modal.Header>
            Mi carrito
          </Modal.Header>
          <Modal.Body>
            <Cart></Cart>
          </Modal.Body>
        </Modal>

        {/* Modal recuperacion pass */}
        <Modal
          show={forgotPW}
          onClose={closeForgotPW}
          size="4xl"
          data-aos="zoom-in-up"
          data-aos-duration="500"
        >
          <ModalHeader>
            Recuperacion de contraseña en Resto Proyect
          </ModalHeader>
          <ModalBody>
            <SendMail></SendMail>
          </ModalBody>
          <ModalFooter>
            <a href="/">© 2022 Resto Project™</a>
          </ModalFooter>
        </Modal>

        {/* Modal registrarse */}
        <Modal
          show={openRegister}
          onClose={closeRegister}
          size="5xl"
          data-aos="zoom-in-down"
          data-aos-duration="500"
        >
          <ModalHeader>
            Registro en Resto Proyect
          </ModalHeader>
          <ModalBody>
            <Register closeRegister={closeRegister}></Register>
          </ModalBody>
          <ModalFooter>
            <a href="/">© 2022 Resto Project™</a>
          </ModalFooter>
        </Modal>

        {/* Modal contacto */}
        <Modal
          show={contacto}
          onClose={closeContacto}
          size='8xl'
          data-aos="fade-left" data-aos-duration="500"
        >
          <ModalHeader>
            Contactanos
          </ModalHeader>
          <ModalBody>
            <ContactForm></ContactForm>
          </ModalBody>
          <ModalFooter>
            <a href="/">© 2022 Resto Project™</a>
          </ModalFooter>
        </Modal>

        {
          JSON.parse(token).token ?
            (
              <Panel
                menuResponsive={menuResponsive}
                setMenuResponsive={setMenuResponsive}
              ></Panel>
            )
            :
            (
              <div className="flex md:order-2">
                <button onClick={openlog} style={{ color: 'white' }} className={buttonclass}>
                  Iniciar Sesión
                </button>
              </div>
            )
        }

        {
          showLoggin ?
            (
              <Loggin
                openlog={openlog}
                showLoggin={showLoggin}
                setForgotPW={setForgotPW}
                setOpenRegister={setOpenRegister}
              />
            )
            :
            null
        }

        <div
          hidden={menuResponsive}
          className=" justify-between items-center w-full md:flex md:w-auto md:order-1"
          id="mobile-menu-2"
        >

          <div className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 duration-500 md:bg-background dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <a href="/" >
              <button className={buttonclass}>
                <div className="divLogoButtonNavBar">
                  <img className="imgNavBarLogo" src='https://res.cloudinary.com/luubermudezz/image/upload/v1666070805/Portafolio/hogar_vr7981.png' alt="home" width='20' />
                  <span>Inicio</span>
                </div>
              </button></a>
            <SearchBar />
            <button className={buttonclass} onClick={() => setContacto(true)}>
              <div className="divLogoButtonNavBar">
                <img className="imgNavBarLogo" src='https://res.cloudinary.com/luubermudezz/image/upload/v1666071044/Portafolio/sobre_umitdw.png' alt="contacto" width='20' />
                <span>Contacto</span>
              </div>
            </button>


          </div>
          <button id="carrito" onClick={() => setOpenCart(true)}>
            <h1>{items?.length > 0 ? items.length : 0}</h1>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
