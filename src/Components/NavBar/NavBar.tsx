import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
//import { StateTypes } from "../../Interfaces/Interfaces";
import { buttonclass } from "../../Style/Clases/Clases";
import Logo from "../../Style/images/Henry.png";
import { useEffect, useState } from "react";
import Loggin from "../LogginForm/Loggin";
import { useAppDispatch } from "../../config";
import { getUser } from "../../redux/actions";
import { Modal } from "flowbite-react";
import Cart from "../Cart/Cart";
import Panel from "./Panel";
import Login from "../Auth/Login";

export default function NavBar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showLoggin, setShowLoggin] = useState<boolean>(false);
  const [openCart, setOpenCart] = useState<boolean | undefined>(false)
  const [menuResponsive, setMenuResponsive] = useState<boolean>(true);

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
    dispatch(getUser(JSON.parse(token)));
  }, []);



  function closeCart() {
    setOpenCart(false)
  }

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900" id="navBar">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <button onClick={handleHome} className="flex items-center">
          <img id="logoNavBarImg" width={150} src={Logo} alt="LOGO"></img>
        </button>
        <Modal
          show={openCart}
          onClose={closeCart}
          size="6xl"
          data-aos="zoom-in-up"
          data-aos-duration="1500"
        >
          <Modal.Header>
            Mi carrito
          </Modal.Header>
          <Modal.Body>
            <Cart></Cart>
          </Modal.Body>
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
                <button onClick={openlog} className={buttonclass}>
                  Iniciar Sesión
                </button>
              </div>
            )
        }

        {showLoggin ? (
          <Loggin openlog={openlog} showLoggin={showLoggin} />
        ) : null}

        <div
          hidden={menuResponsive}
          className=" justify-between items-center w-full md:flex md:w-auto md:order-1"
          id="mobile-menu-2"
        >
          <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <SearchBar />
            </li>
            <li className="flex items-center">
              <button id="carrito" onClick={() => setOpenCart(true)}>
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
            </li>
            <li>
              <div className="PRUEBA">
                <Login></Login>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
