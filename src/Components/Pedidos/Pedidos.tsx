import Card from "../Card/Card";
import "../Pedidos/Pedidos.css";
import NavBar from "../NavBar/NavBar";
import Form from "../Form/Form";
import { ListGroup } from "flowbite-react";
import { Link } from "react-scroll";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../config";
import { getCategories } from "../../redux/actions";
import { buttonclass, select } from "../../Style/Clases/Clases";
import DetailProduct from "../DetailProduct/DetailProduct";
import VideoHome from '../../Style/videos/video.mp4'

export default function Pedidos() {

    const [order, setOrder] = useState("");
    const [createProduct, setcreateProduct] = useState<Boolean>(false);
    const [editProduct, seteditProduct] = useState<Boolean>(false);
    const [showModal, setShowModal] = useState<boolean | undefined>(false);
    const [showDetailModal, setShowDetailModal] = useState<boolean | undefined>(false);
    const [idModal, setIdModal] = useState<string>();

    const [formData, setFormData] = useState<any>({
        name: "test",
        img: "https://citizengo.org/sites/default/files/images/test_3.png",
        price: 0,
        description: "test-description",
        off: 0,
        stock: 0,
        rating: 3,
        category: "",
        newProduct: true,
    });

    const onProducEdit = (input: any) => {
        seteditProduct(true);
        setcreateProduct(false);
        setFormData(input);
        setShowModal(true);
    };

    function orderSort(e: any) {
        e.preventDefault(e);
        setOrder(e.target.value);
    }

    let dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getCategories(order));
    }, [dispatch, order]);

    let categories = useAppSelector((state: any) => state.categories);
    // let products = useAppSelector((state: any) => state.products);

    // console.log("PRODUCTOS", products)
    // console.log("CATEGORIAS", categories)

    return (
        <>
            <NavBar
                setShowModal={setShowModal}
                seteditProduct={seteditProduct}
                setcreateProduct={setcreateProduct}
            />
            <div className="Contenedor">
                <div className="TOP">
                    <h1>Henry's Resto Proyect</h1>
                    <video autoPlay preload="auto" muted loop src={VideoHome}></video>
                </div>
                {/* <div className="background_image_gps" /> */}
                <div className="sort-buttons">
                    <select
                        onChange={(e) => orderSort(e)}
                        className={select}
                        id='selectConfigSize'
                    >
                        <option>Dietas</option>
                    </select>

                    <select className={select} onChange={(e) => orderSort(e)} id='selectConfigSize'>
                        <option value="">Ordenar por nombre:</option>
                        <option value="AZ">AZ</option>
                        <option value="ZA">ZA</option>
                    </select>
                    <select className={select} onChange={(e) => orderSort(e)} id='selectConfigSize' >
                        <option value="">Ordenar por precio:</option>
                        <option value="mayor">Mayor precio</option>
                        <option value="menor">Menor precio</option>
                    </select>
                    <button className={buttonclass} >MAS COMPRADOS</button>
                    <button className={buttonclass} >MAS POPULARES</button>
                </div>
                <div className="categorias-productos">
                    <div className="categorias-div">
                        <div className="categorias-conteiner">
                            <ListGroup>
                                {categories?.map((cat: any) => {
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
                        {categories?.map((categoria: any) => {
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
                                        {categoria?.categoryProducts?.map((info: any) => {
                                            return (
                                                <Card
                                                    onProducEdit={onProducEdit}
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
                editProduct ? (
                    <Form
                        setShowModal={setShowModal}
                        showModal={showModal}
                        setFormData={setFormData}
                        newProduct={false}
                        setcreateProduct={setcreateProduct}
                        formData={formData}
                        seteditProduct={seteditProduct}
                    />
                )
                    :
                    null
            }
            {
                createProduct ? (
                    <Form
                        setShowModal={setShowModal}
                        showModal={showModal}
                        setFormData={setFormData}
                        newProduct={true}
                        setcreateProduct={setcreateProduct}
                        formData={formData}
                        seteditProduct={seteditProduct}
                    />
                )
                    : null
            }

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

