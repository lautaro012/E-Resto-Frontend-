import Card from '../Card/Card'
import '../Pedidos/Pedidos.css'
import NavBar from '../NavBar/NavBar'
import Form from '../Form/Form'
import { Link } from 'react-scroll'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../config'
import { getCategories, getProducts } from '../../redux/actions'
import { Button } from 'flowbite-react'

export default function Pedidos() {

    const [order, setOrder] = useState('')

    const [createProduct, setcreateProduct] = useState<Boolean>(false)
    const [editProduct, seteditProduct] = useState<Boolean>(false)
    const [formData, setFormData] = useState<any>({
        name: 'test',
        img: 'https://citizengo.org/sites/default/files/images/test_3.png',
        price: 0,
        description: 'test-description',
        off: 0,
        stock: 0,
        rating: 3,
        category: '',
        newProduct: true
    })
    const onProducEdit = (input: any) => {
        seteditProduct(true);
        setcreateProduct(false)
        setFormData(input)
    }
    function orderSort(e: any) {
        e.preventDefault(e)
        setOrder(e.target.value)
    }

    let dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getCategories(order))
    }, [dispatch, order])

    let categories = useAppSelector((state: any) => state.categories);
    // let products = useAppSelector((state: any) => state.products);

    // console.log("PRODUCTOS", products)
    // console.log("CATEGORIAS", categories)

    return (
        <>
            <NavBar seteditProduct={seteditProduct} setcreateProduct={setcreateProduct} comeback={false} />
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
                                    categories?.map((cat: any) => {
                                        return (
                                            cat.categoryProducts.length !== 0 ?
                                                <li key={cat.name}><Link activeClass="active" className="test1" to={cat.name} spy={true} smooth={true} duration={1000}> <button>{cat.name}</button> </Link></li>
                                                :
                                                null
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <div className='productos-conteiner'>
                        {
                            categories?.map((categoria: any) => {
                                return (
                                    categoria.categoryProducts.length !== 0 ?
                                        <div id={categoria.name} key={categoria._id} className='Categoria'>
                                            <h3>{categoria.name}</h3>
                                            <div className='Contenedor_cartas'>
                                                {
                                                    categoria?.categoryProducts?.map((info: any) => {
                                                        return <Card onProducEdit={onProducEdit} key={info.name} comidaProps={info} />
                                                    })
                                                }
                                            </div>
                                        </div>
                                        :
                                        null
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            {editProduct ? <Form setFormData={setFormData} newProduct={false} setcreateProduct={setcreateProduct} formData={formData} seteditProduct={seteditProduct} /> : null}
            {createProduct ? <Form setFormData={setFormData} newProduct={true} setcreateProduct={setcreateProduct} formData={formData} seteditProduct={seteditProduct} /> : null}
        </>
    )
}