import Card from "../Card/Card";
import "../Pedidos/Pedidos.css";
import NavBar from "../NavBar/NavBar";
import { ListGroup } from "flowbite-react";
import { Link } from "react-scroll";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../config";
import { getCategories } from "../../redux/actions";
import { buttonclass, select } from "../../Style/Clases/Clases";
import DetailProduct from "../DetailProduct/DetailProduct";
import VideoHome from '../../Style/videos/video.mp4'
import { Category, ProductDetail, Select, StateTypes } from "../../Interfaces/Interfaces";
import ScrollToTop from "react-scroll-to-top";
import AOS from 'aos';
import heladoBlanco from '../../Style/images/heladoBlanco.png'
import heladoNegro from '../../Style/images/heladoNegro.png'
import 'aos/dist/aos.css';
AOS.init();

export default function Pedidos() {

    const [order, setOrder] = useState("");
    const [showDetailModal, setShowDetailModal] = useState<boolean | undefined>(false);
    const [idModal, setIdModal] = useState<string>();
    const [render, setRender] = useState<boolean>(false)
    const theme = localStorage.getItem("theme")!;

    let categories = useAppSelector((state: StateTypes) => state.categories);

    function orderSort(e: Select) {
        e.preventDefault();
        setOrder(e.target.value);
    }

    let dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getCategories(order));
    }, [dispatch, order]);

    function setDarkMode() {
        document.getElementById("boton_dark")?.classList.toggle("sun")
        if (document.documentElement.classList.toggle('dark')) {
            localStorage.theme = "dark"
        }
        else {
            localStorage.theme = "light"
        }
        render ? setRender(false) : setRender(true)
    }
    

    return (
        <>
            <NavBar />
            <div className="Contenedor">
                <div className="TOP">
                    <h1>Henry's Resto Proyect</h1>
                    <video autoPlay preload="auto" muted loop src={VideoHome}></video>
                </div>
                <button className="theme-toggle--button" aria-label="Toggle Theme" onClick={() => setDarkMode()}>
                    <span className={theme === "dark" ? "shape sun" : "shape moon"}></span>
                    <span className="rays--container">
                        <span className="ray"></span>
                        <span className="ray"></span>
                        <span className="ray"></span>
                        <span className="ray"></span>
                    </span>
                </button>
                <div className="sort-buttons">
                    <select className={select} onChange={(e) => orderSort(e)} id='selectConfigSize'>
                        <option value="">Ordenar Productos</option>
                        <option value="AZ">A-z</option>
                        <option value="ZA">Z-a</option>
                        <option value="mayorPrecio">Precio +</option>
                        <option value="menorPrecio">Precio -</option>
                        <option value="mayorRating">Rating +</option>
                    </select>
                </div>
                <div className="categorias-productos">
                    <div className="categorias-div">
                        <div className="categorias-conteiner">
                            <ListGroup>
                                {categories?.map((cat: Category) => {
                                    return cat.categoryProducts.length !== 0 ? (
                                        <Link
                                            activeClass="active"
                                            to={cat.name}
                                            spy={true}
                                            smooth={true}
                                            key={cat.name}
                                        >
                                            <ListGroup.Item key={cat.name}>
                                                {" "}
                                                <button id="buttonAsideConfig" className={buttonclass}>{cat.name}</button>
                                                {" "}
                                            </ListGroup.Item>
                                        </Link>
                                    ) : null;
                                })}
                            </ListGroup>
                        </div>

                    </div>
                    <div className="productos-conteiner">

                        {
                            categories?.map((categoria: Category) => {
                                return categoria.categoryProducts.length !== 0 ? (
                                    <div
                                        data-aos="fade-up" data-aos-duration="1500"
                                        id={categoria.name}
                                        key={categoria._id}
                                        className="Categoria"
                                    >
                                        <h1 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                            <strong>{categoria.name}</strong>
                                            <span className="mr-2 ml-3 rounded bg-blue-100 px-2.5 py-0.5 text-4xl font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
                                                {categoria.categoryProducts.length}
                                            </span>
                                        </h1>
                                        <br></br>

                                        <div className="Contenedor_cartas">
                                            {categoria?.categoryProducts?.map((info: ProductDetail) => {
                                                return (
                                                    <Card
                                                        key={info.name}
                                                        comidaProps={info}
                                                        modalOpen={setShowDetailModal}
                                                        setIdModal={setIdModal}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            ) : null;
                        })}
                                )
                                :
                                null   
                            })                  
                        }
                        {
                            categories && categories?.every(categoria => categoria.categoryProducts.length === 0) ?
                            <div className="flex items-center justify-around">
                            <div className="flex flex-col dark:text-white">
                                <h1 className="text-7xl"> Oops... </h1>
                                <br></br>
                                <h2 className="text-5xl"> Algo salio mal </h2>
                            </div>
                            <img className="duration-500" src={theme === 'dark' ? heladoNegro : heladoBlanco } alt='404'/>
                            </div>
                            :
                            null
                        }
                    </div>
                </div>
            </div>
            {
                showDetailModal ?
                    <DetailProduct
                        id={idModal}
                        closeModalDetail={setShowDetailModal}
                    />
                    :
                    null
            }
            <ScrollToTop className={buttonclass} id='top_button' smooth viewBox="0 0 24 24" svgPath="M5 15l7-7 7 7" />
        </>
    );
}

