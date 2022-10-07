import Card from "../Card/Card";
import "../Pedidos/Pedidos.css";
import NavBar from "../NavBar/NavBar";
import Form from "../Form/Form";
import { ListGroup } from "flowbite-react";
import { Link } from "react-scroll";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../config";
import { getCategories } from "../../redux/actions";
import { buttonclass, select } from "../../Style/Clases/Clases";
import DetailProduct from "../DetailProduct/DetailProduct";
import VideoHome from '../../Style/videos/video.mp4'
import { CardForm, Category, ProductDetail, Select, StateTypes } from "../../Interfaces/Interfaces";
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
    // let products = useAppSelector((state: any) => state.products);

    // console.log("PRODUCTOS", products)
    // console.log("CATEGORIAS", categories)

    return (
        <>
            <NavBar/>
            <div className="Contenedor">
                <div className="TOP">
                    <h1>Henry's Resto Proyect</h1>
                    <video autoPlay preload="auto" muted loop src={VideoHome}></video>
                </div>
                {/* <div className="background_image_gps" /> */}
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
                    <button className={buttonclass} >MAS COMPRADOS</button>
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
                                    id={categoria.name}
                                    key={categoria._id}
                                    className="Categoria"
                                >
                                    <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                        <strong>{categoria.name}</strong>
                                        <span className="mr-2 ml-3 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
                                            {categoria.categoryProducts.length}
                                        </span>
                                    </h1>

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
            <Link activeClass="active" to="navBar" spy={true} smooth={true} duration={1000}>
                <button className={buttonclass} id='top_button'>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7l4-4m0 0l4 4m-4-4v18"></path></svg>
                </button>
            </Link>
        </>
    );
}

