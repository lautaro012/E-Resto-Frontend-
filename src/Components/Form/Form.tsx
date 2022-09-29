
import React, { useState } from 'react'
import Card from '../Card/Card'
import './Form.css'

export default function Form () {

    const [input, setInput] = useState({
        name: 'test',
        image: 'https://citizengo.org/sites/default/files/images/test_3.png',
        price: 0,
        description: 'test-description'
    })

    return (
        <div className='form-conteiner'>
            <aside>
                <h1> Inserta la informacion de tu Producto:</h1>
                <div>
                    <form>
                        <div className='input-label'>
                            <label>Nombre:</label>
                            <input required></input>
                        </div>
                        <div className='input-label'>
                            <label>Descripcion:</label>
                            <input required></input>
                        </div>
                        <div className='input-label'>
                            <label>Precio:</label>
                            <input required></input>
                        </div>
                        <div className='input-label'>
                            <label>Imagen:</label>
                            <input required type='url'/>
                        </div>
                        <button type='submit'>SUBMIT</button>
                    </form>
                </div>
            </aside>
            <aside>
            PREVIEW
            <Card name={input.name} image={input.image} description={input.description} price={input.price}></Card>
            </aside>
        </div>
    )
}