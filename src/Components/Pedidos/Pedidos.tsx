import { useState } from "react";
import Card from '../Card/Card'
import Comidas from '../../_temp/Comidas.json'
import BebidasSinAlcohol from '../../_temp/BebidasSinAlcohol.json'
import Postres from '../../_temp/Postres.json'
import '../Pedidos/Pedidos.css'
import SearchBar from './SearchBar'
import { useNavigate, Link, useParams } from "react-router-dom";

export default function Pedidos() {

    const navigate = useNavigate();

    const handleHome = () => {
        // home.current?.scrollIntoView({behavior: 'smooth'});
        navigate('/')
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    const [detailPop, setDetailPop] = useState(false)

    const [detailCard, setDetailCard] = useState({
        name: "",
        image: "",
        price: 0,
        description: "",
        off: 0
    })

    function openDetail(event: any, comida: any) {
        event.preventDefault()
        setDetailCard({
            name: comida.name,
            image: comida.img,
            price: comida.price,
            description: comida.description,
            off: comida.off
        })
        setDetailPop(true)
    }

    return (
        <>
            <nav className="navbar-conteiner">
                <header>
                    <div className='navbar-buttons'>
                        <button onClick={handleHome}> HOME </button>
                    </div>
                    <img src='http://www.occohelados.com.ar/_nuxt/img/logo.18d63ee.png' alt='LOGO'></img>

                </header>
            </nav>
            <div className='Contenedor'>

                <SearchBar></SearchBar>

                {
                    detailPop !== false ?
                        <div className="imagePOP">
                            <div id="detalle_izq">
                                <h1>{detailCard.name}</h1>
                                <img src={detailCard.image} alt="ImagenPOP" ></img>
                                <h2>$ {detailCard.price}</h2>
                                {
                                    detailCard.off !== 0 ?
                                        <h2>{detailCard.off}</h2>
                                        :
                                        null
                                }
                            </div>
                            <div id="detalle_der">
                                <div>
                                    <h2>Detalles</h2>
                                    <p>{detailCard.description}</p>
                                </div>
                                <div className="detail_label">
                                    <details>
                                        <summary><h2>Bebida (opcional)</h2></summary>
                                        {
                                            BebidasSinAlcohol.map(bebida => {
                                                return (
                                                    <option>{bebida.name}</option>
                                                )
                                            })
                                        }
                                    </details>
                                </div>
                                <div className="detail_label">
                                    <details>
                                        <summary><h2>Postre (opcional)</h2></summary>
                                        {
                                            Postres.map(postre => {
                                                return (
                                                    <option>{postre.name}</option>
                                                )
                                            })
                                        }
                                    </details>
                                </div>
                                <div>
                                    <h2>Comentarios</h2>
                                    <textarea
                                        name='comentarios'
                                        placeholder="Algo que nos quieras comentar sobre el pedido ?"
                                        rows={5} cols={55}
                                    />
                                </div>
                            </div>
                            <button onClick={() => setDetailPop(false)}>X</button>
                        </div>
                        :
                        null
                }

                {
                    Comidas.length > 0 ?

                        typeof Comidas === "object" ?
                            Comidas.map(categoria => {
                                return (
                                    <div className='Categoria'>
                                        <h3>{Object.keys(categoria)} ( {Object.values(categoria)[0].length} )</h3>
                                        <div className='Contenedor_cartas'>
                                            {
                                                Object.values(categoria)[0].map((comida: any) => {
                                                    return (
                                                        <div onClick={(event) => openDetail(event, comida)}>
                                                            <Card name={comida.name} image={comida.img} price={comida.price} description={comida.description} off={comida.off} />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                            :
                            <h5>No hay comidas</h5>
                        :
                        <div>
                            <h5>Loading...</h5>
                        </div>
                }
            </div>
        </>
    )
}