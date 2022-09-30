
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../config'
import { CardForm } from '../../Interfaces/Interfaces'
import { createForm, getCategories } from '../../redux/actions'
import Card from '../Card/Card'
import NavBar from '../NavBar/NavBar'
import './Form.css'

export default function Form () {

    const [oferta, setOferta] = useState<Boolean>(false)
    const [input, setInput] = useState<CardForm>({
        name: 'test',
        img: 'https://citizengo.org/sites/default/files/images/test_3.png',
        price: 0,
        description: 'test-description',
        off: 0,
        stock: 0,
        rating: 3,
        category: '',
    })

    let dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch])

    let categories = useAppSelector((state:any) => state.categories);

    const handleOferta = () => {
        oferta ? setOferta(false) : setOferta(true)
    }
    const handleChange = (e:any) => {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }
    const handleSelect = (e:any) => {
        setInput({
            ...input,
            category: e.target.value
        })

    }
    const handleSubmit = (e:any) => {
        e.preventDefault()
        dispatch(createForm(input))
        setInput({
            name: 'test',
            img: 'https://citizengo.org/sites/default/files/images/test_3.png',
            price: 0,
            description: 'test-description',
            off: 0,
            stock: 0,
            rating: 3,
            category: '',
        })
    }
    return (
        <>
            <NavBar comeback={true}/>
        <div className='form-conteiner'>
            <aside>
                <h1> Inserta la informacion de tu Producto:</h1>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className='input-label'>
                            <label>Nombre:</label>
                            <input onChange={handleChange} 
                            maxLength={15}
                            required
                            name="name"
                            type="text"
                            placeholder="Inserte un nombre"
                            ></input>
                        </div>
                        <div className='input-label'>
                            <label>Descripcion:</label>
                            <input onChange={handleChange} 
                            required 
                            type="text"
                            placeholder="Descripcion"
                            name='description'
                            ></input>
                        </div>
                        <div className='input-label'>
                            <label>Precio:</label>
                            <input onChange={handleChange} 
                            required
                            placeholder='Ingrese un precio'
                            name='price' 
                            type='number'
                            min={0}
                            max={9999}
                            ></input>
                        </div>
                        <div>
                            <label>Desea agregar el producto como oferta ?</label>
                            {
                                !oferta ?
                                <button type='button' onClick={handleOferta}>Agregar como oferta</button>
                                :
                                <div>
                                    <input onChange={handleChange} name='off' placeholder='Seleccione Descuento(%)' type='number'></input>
                                    <button onClick={handleOferta}>Quitar Oferta</button>
                                </div>
                            }
                        </div>
                        <div className='input-label'>
                            <select onChange={handleSelect} required>    
                                <option>Seleccione una categoria</option>                          
                                {
                                    categories.map((cat:any) => {
                                        return(
                                            <option key={cat.name} value={cat.name}>{cat.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='input-label'>
                            <label>Stock:</label>
                            <input onChange={handleChange} 
                            required
                            placeholder='Ingrese un stock inicial'
                            name='stock' 
                            type='number'
                            min={0}
                            max={9999}
                            ></input>
                        </div>
                        <div className='input-label'>
                            <label>Imagen:</label>
                            <input onChange={handleChange} 
                            required 
                            name='img'  
                            type='url'
                            />
                        </div>
                        <button className='submit-button' type='submit'>Crear</button>
                    </form>
                </div>
            </aside>
            <aside>
                <Card off={input.off} name={input.name} img={input.img} description={input.description} price={input.price}></Card>
            </aside>
        </div>

        </>

    )
}