import { useState } from "react";
import Card from '../Card/Card'

import Comidas from '../../_temp/Comidas.json'
import BebidasSinAlcohol from '../../_temp/BebidasSinAlcohol.json'
import Postres from '../../_temp/Postres.json'
import '../Pedidos/Pedidos.css'
//import SearchBar from './SearchBar'
import { useNavigate, Link, useParams } from "react-router-dom";

import '../Pedidos/Pedidos.css'
import NavBar from '../NavBar/NavBar'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../config'
import { getCategories, getProducts } from '../../redux/actions'

export default function Pedidos() {

    let dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getProducts())
        dispatch(getCategories())
    }, [dispatch])

    let categories = useAppSelector((state: any) => state.categories);

    let products = useAppSelector((state: any) => state.products);

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
            <NavBar></NavBar>
            <div className='Contenedor'>

                <div className='background_image_gps' />
                <div className='sort-buttons'>
                    <select><option>DIETAS</option></select>
                    <button>SORT</button>
                    <button>SORT</button>
                    <button>MAS COMPRADOS</button>
                    <button>MAS POPULARES</button>
                </div>
                <div className='categorias-productos'>
                    <div className='categorias-div'>
                        <div className='categorias-conteiner'>
                            <ul>
                                {
                                    categories.map((cat: any) => {
                                        return (
                                            <li key={cat._id}> {cat.name} </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
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
                    <div className='productos-conteiner'>
                        {
                            categories?.map((categoria: any) => {

                                return (
                                    <div key={categoria._id} className='Categoria'>
                                        <h3>{categoria.name}</h3>

                                        <div className='Contenedor_cartas'>
                                            {

                                                products?.map((comida: any) => {
                                                    if (comida.categoryProducts.name === categoria.name) {
                                                        return (
                                                            <div onClick={(event) => openDetail(event, comida)}>
                                                                <Card off={0} key={comida._id} name={comida.name} img={comida.img} price={comida.price} description={comida.description} />
                                                            </div>
                                                        )
                                                    }


                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}