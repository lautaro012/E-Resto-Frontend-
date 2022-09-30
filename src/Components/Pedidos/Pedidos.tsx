import Card from '../Card/Card'
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

    let categories = useAppSelector((state:any) => state.categories);

    let products = useAppSelector((state:any) => state.products);

    return (
        <>
            <NavBar comeback={false}/>
            <div className='Contenedor'>
                <div className='background_image_gps'/>
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
                                    categories.map((cat:any) => {
                                        return (
                                            <li key={cat._id}> {cat.name} </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <div className='productos-conteiner'>
                        {
                            categories?.map((categoria:any) => {
                                return (
                                    <div key={categoria._id} className='Categoria'>
                                        <h3>{categoria.name}</h3>

                                        <div className='Contenedor_cartas'>
                                            {
                                            products?.map((comida: any) => {
                                                if(comida.categoryProducts.name === categoria.name){
                                                     return (
                                                        <Card off={0} key={comida._id} name={comida.name} img={comida.img} price={comida.price} description={comida.description} />
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