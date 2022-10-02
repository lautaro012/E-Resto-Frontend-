
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../config'
import { CardForm } from '../../Interfaces/Interfaces'
import { createProduct, getCategories, editProduct } from '../../redux/actions'
import Card from '../Card/Card'
import NavBar from '../NavBar/NavBar'
import './Form.css'

export default function Form ({newProduct,setFormData, formData, setcreateProduct, seteditProduct}:any) {
    
    let dispatch = useAppDispatch()
    const [oferta, setOferta] = useState<Boolean>(false)
    const [input, setInput] = useState<CardForm>({
        name: formData.name,
        img: formData.img,
        price: formData.price,
        description: formData.description,
        off: formData.off,
        stock: formData.stock,
        rating: formData.rating,
        category: formData.category,
    })

    const handleClose = (e:any) => {
        e.preventDefault()
        setcreateProduct(false)
        seteditProduct(false)
        setFormData({
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
    }

    useEffect(() => {
        dispatch(getCategories(""))
    }, [dispatch])

    let categories = useAppSelector((state:any) => state.categories);

    const handleOferta = () => {
        if(oferta) {
            setOferta(false)
            setInput({
                ...input,
                off:0
            })
         } else {
            setOferta(true)
         }
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
        if (formData.newProduct) {
          return dispatch(createProduct(input));
        }
        dispatch(editProduct(input, formData._id));
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
      };
    return (
        <>
            <NavBar seteditProduct={seteditProduct} setcreateProduct={setcreateProduct} comeback={true}/>
        <div className='form-conteiner'>
            <button onClick={handleClose}>Cerrar</button>
            <aside>
                {
                    newProduct ?
                    <h1> Inserta la informacion de tu Producto:</h1>
                    :
                    <h1> Edita la informacion de tu Producto:</h1>

                }
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
                            defaultValue={formData.name}
                            ></input>
                        </div>
                        <div className='input-label'>
                            <label>Descripcion:</label>
                            <input onChange={handleChange} 
                            required 
                            type="text"
                            placeholder="Descripcion"
                            name='description'
                            defaultValue={formData.description}
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
                            defaultValue={formData.price}
                            ></input>
                        </div>
                        <div>
                            <label>Desea agregar el producto como oferta ?</label>
                            {
                                !oferta ?
                                <button type='button' onClick={handleOferta}>Agregar como oferta</button>
                                :
                                <div>
                                    <input className='input-descuento' onChange={handleChange} name='off' placeholder='Seleccione Descuento(%)' type='number'></input>
                                    <button onClick={handleOferta}>Quitar Oferta</button>
                                </div>
                            }
                        </div>
                        <div className='input-label'>
                            <select defaultValue={formData.category} onChange={handleSelect} required>    
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
                            defaultValue={formData.stock}
                            ></input>
                        </div>
                        <div className='input-label'>
                            <label>Imagen:</label>
                            <input onChange={handleChange} 
                            required 
                            name='img'  
                            type='url'
                            defaultValue={formData.img}
                            />
                        </div>
                        {
                            newProduct ?
                            <button className='submit-button' type='submit'>Crear</button>
                            :
                            <button className='submit-button' type='submit'>Editar</button>
                        }
                    </form>
                </div>
            </aside>
            <aside>
                <Card formCard={true} comidaProps={input}></Card>
            </aside>
        </div>

        </>

    )
}