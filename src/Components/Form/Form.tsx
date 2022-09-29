import { useState } from 'react'
import { CardProp } from '../../Interfaces/Interfaces'
import Card from '../Card/Card'
import './Form.css'

export default function Form () {

    const [input, setInput] = useState<CardProp>({
        name: 'test',
        image: 'https://citizengo.org/sites/default/files/images/test_3.png',
        price: 0,
        description: 'test-description',
        off: 0
    })
    const [oferta, setOferta] = useState<Boolean>(false)
    const handleOferta = () => {
        oferta ? setOferta(false) : setOferta(true)
    }
    const handleChange = (e:any) => {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }
    return (
        <div className='form-conteiner'>
            <aside>
                <h1> Inserta la informacion de tu Producto:</h1>
                <div>
                    <form>
                        <div className='input-label'>
                            <label>Nombre:</label>
                            <input onChange={handleChange}  type='string' name='name' ></input>
                        </div>
                        <div className='input-label'>
                            <label>Descripcion:</label>
                            <input onChange={handleChange} type='string' name='description' ></input>
                        </div>
                        <div className='input-label'>
                            <label>Precio:</label>
                            <input onChange={handleChange} name='price' type='number' ></input>
                        </div>
                        <div>
                            <label>Desea agregar el producto como oferta ?</label>
                            {
                                !oferta ?
                                <button type='button' onClick={handleOferta}>Agregar como oferta</button>
                                :
                                <div>
                                    <input onChange={handleChange} name='off' placeholder='Seleccione Descuento(%)' type='number'></input>
                                    <button type='button' onClick={handleOferta}>Quitar Oferta</button>
                                </div>
                            }
                        </div>
                        <div className='input-label'>
                            <label>Imagen:</label>
                            <input onChange={handleChange} name='image'  type='url'/>
                        </div>
                        <button type='submit'>Crear</button>
                    </form>
                </div>
            </aside>
            <aside>
                <h1>PREVIEW</h1>
                <Card off={input.off} name={input.name} image={input.image} description={input.description} price={input.price}></Card>
            </aside>
        </div>
    )
}