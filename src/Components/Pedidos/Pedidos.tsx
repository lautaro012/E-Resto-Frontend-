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
import 'aos/dist/aos.css';
AOS.init();

export default function Pedidos() {

    const [order, setOrder] = useState("");
    const [showDetailModal, setShowDetailModal] = useState<boolean | undefined>(false);
    const [idModal, setIdModal] = useState<string>();

    function orderSort(e: Select) {
        e.preventDefault();
        setOrder(e.target.value);
    }

    let dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getCategories(order));
    }, [dispatch, order]);

    let categories = useAppSelector((state: StateTypes) => state.categories);

    return (
        <>
            <NavBar />
            <div className="Contenedor">
                <div className="TOP">
                    <h1>Henry's Resto Proyect</h1>
                    <video autoPlay preload="auto" muted loop src={VideoHome}></video>
                </div>
                <div className="sort-buttons">
                    {/* <select
                        onChange={(e) => orderSort(e)}
                        className={select}
                        id='selectConfigSize'
                    >
                        <option>Dietas</option>
                    </select> */}

                    <select className={select} onChange={(e) => orderSort(e)} id='selectConfigSize'>
                        <option value="">Ordenar por nombre:</option>
                        <option value="AZ">AZ</option>
                        <option value="ZA">ZA</option>
                    </select>
                    <select className={select} onChange={(e) => orderSort(e)} id='selectConfigSize' >
                        <option value="">Ordenar por precio:</option>
                        <option value="mayorPrecio">Mayor precio</option>
                        <option value="menorPrecio">Menor precio</option>
                    </select>
                    {/* <button className={buttonclass} >MAS COMPRADOS</button> */}
                    <button className={buttonclass} onClick={(e) => setOrder("mayorRating")}>MAS POPULARES</button>
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
                                            duration={1000}
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
                        {categories?.map((categoria: Category) => {
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
                            ) : null;
                        })}
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

