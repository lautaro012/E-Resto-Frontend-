import Card from '../Card/Card'
import '../Pedidos/Pedidos.css'
import NavBar from '../NavBar/NavBar'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../config'
import { getCategories, getProducts } from '../../redux/actions'

export default function Pedidos() {

    const [order, setOrder] = useState('')

    function orderSort(e: any) {
        e.preventDefault(e)
        setOrder(e.target.value)
    }

    let dispatch = useAppDispatch()
    useEffect(() => {
        console.log(order)
        dispatch(getProducts(order))
        dispatch(getCategories())
    }, [dispatch, order])

    let categories = useAppSelector((state: any) => state.categories);

    let products = useAppSelector((state: any) => state.products);

    return (
        <>
            <NavBar comeback={false} />
            <div className='Contenedor'>

                <div className='background_image_gps' />
                <div className='sort-buttons'>
                    <select><option>DIETAS</option></select>
                    <select onChange={(e) => orderSort(e)}>
                        <option value=''>Ordenar por nombre:</option>
                        <option value='AZ'>AZ</option>
                        <option value='ZA'>ZA</option>
                    </select>
                    <select onChange={(e) => orderSort(e)}>
                        <option value=''>Ordenar por precio:</option>
                        <option value='mayor'>Mayor precio</option>
                        <option value='menor'>Menor precio</option>
                    </select>
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
                                            <a href={`#${cat.name}`}><li key={cat._id}> {cat.name} </li></a>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <div className='productos-conteiner'>
                        {
                            categories?.map((categoria: any) => {
                                if(products.length > 0) {
                                    
                                }
                                return (
                                    <div id={categoria.name} key={categoria._id} className='Categoria'>
                                        <h3>{categoria.name}</h3>

                                        <div className='Contenedor_cartas'>
                                            {

                                                products?.filter((e:any) => e.categoryProducts.name === categoria.name)
                                                .map((comida: any) => {
                                                    if (comida.categoryProducts.name === categoria.name){
                                                      return (
                                                        <Card comidaProps={comida} />
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