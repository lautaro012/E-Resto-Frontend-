import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { StateTypes } from "../../Interfaces/Interfaces";
import { aNavbar, buttonclass } from "../../Style/Clases/Clases";
import Logo from "../../Style/images/Henry.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Loggin from "../LogginForm/Loggin";
import { useAppDispatch, useAppSelector } from "../../config";
import { getUser } from "../../redux/actions";

export default function NavBar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showLoggin, setShowLoggin] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(true);
  const [menuResponsive, setMenuResponsive] = useState<boolean>(true);
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

  let token: any = localStorage.getItem("token");
  console.log(menuResponsive);

  useEffect(() => {
    dispatch(getUser(JSON.parse(token)));
  }, [dispatch, token]);
  
  const handleUser = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const handleLogout = () => {
    localStorage.setItem("token", JSON.stringify([]));
    setMenuResponsive(true)
  };

  const handleResponsive = () => {
    menuResponsive ? setMenuResponsive(false) : setMenuResponsive(true);
  };

  let user = useAppSelector((state: StateTypes) => state.user);

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900" id="navBar">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
          <button onClick={handleHome} className="flex items-center">
            <img id="logoNavBarImg" width={150} src={Logo} alt="LOGO"></img>
          </button>
        {JSON.parse(token).token ? (
          <div className="flex items-center md:order-2">
            <button
              onClick={handleUser}
              type="button"
              className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              <span className="sr-only">Open user menu</span>
              <img className="w-16 h-16 rounded-full" src={user.img} alt="user" />
            </button>
            {/* <!-- Dropdown menu --> */}
            <div
              hidden={open}
              className=" absolute top-20 right-0 z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
              id="user-dropdown"
            >
              <div className="py-3 px-4">
                <span className="block text-sm text-gray-900 dark:text-white">
                  {user.name} {user.lastName}
                </span>
                <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                  {" "}
                  {user.mail}{" "}
                </span>
              </div>
              <ul className="py-1" aria-labelledby="user-menu-button">
                <li>
                    <button className={aNavbar} onClick={() => navigate('/admin')} type="button">
                    Usuarios Registrados
                    </button>
                </li>
                <li>
                    <button className={aNavbar} onClick={() => navigate('/admin')} type="button">
                    Usuarios Baneados
                    </button>
                </li>
                <li>
                    <button className={aNavbar} onClick={() => navigate('/admin')}  type="button">
                    Administradores
                    </button>
                </li>
                <li>
                    <button className={aNavbar} onClick={() => navigate('/admin')}  type="button">
                    Administrar Productos
                    </button>
                </li>
                <li>
                    <button 
                    className={aNavbar}
                    onClick={handleLogout}>
                        Cerrar sesion
                    </button>
                </li>
              </ul>
            </div>
            <button
              onClick={handleResponsive}
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex md:order-2">
            <button onClick={openlog} className={buttonclass}>
              {" "}
              Iniciar Sesión{" "}
            </button>
          </div>
        )}

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
                <Link to={"/cart"}>
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
                </Link>
            </li>
            <li>
            {/* <button className={buttonclass} type="button">
              Boton random
            </button> */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
