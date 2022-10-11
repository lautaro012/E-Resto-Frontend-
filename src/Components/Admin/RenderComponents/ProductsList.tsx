import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../config'
import { deleteProduct, getCategories } from '../../../redux/actions'
import { buttonClassTeal, select } from '../../../Style/Clases/Clases'
import SearchBar from '../../SearchBar/SearchBar'
import Cartita from './Cartita'
import './ProductsList.css'

const ProductsList = ({onProducEdit, openForm}:any) => {
    let dispatch = useAppDispatch()
    let cats = useAppSelector((state) => state.categories)
    const[order, setOrder] = useState('')

    const deleted = (id:any) => {
        dispatch(deleteProduct(id));
        dispatch(getCategories('AZ'))
        
    }
    useEffect(() => {
        dispatch(getCategories(order))
    }, [dispatch, order])
    

    function orderSort(e: any) {
        e.preventDefault();
        setOrder(e.target.value);
    }

  return (
    <div className='firstDivProductSizing'>
        <div className='searchBarDivAdmin'><SearchBar></SearchBar></div>
        <div className='secondDivSizingAdmin'>
            <div>
            <select className={select} onChange={(e) => orderSort(e)} id='selectConfigSizeAdmin'>                        
                <option value="">Ordenar por nombre:</option>
                <option value="AZ">AZ</option>
                <option value="ZA">ZA</option>
                </select>
            </div>
            <div>
            <select className={select} onChange={(e) => orderSort(e)} id='selectConfigSizeAdmin'>                        
                <option value="">Ordenar por precio:</option>
                <option value="mayorPrecio">Mayor precio</option>
                <option value="menorPrecio">Menor precio</option>
                </select>
            </div>
        </div>
        {cats.map((el:any) => {
            return el.categoryProducts.length !== 0 ? (
                <div id={`${el.name}Ad`}>
                    <h3><div className='name-addProduct'>{el.name} <button onClick={openForm}>+ Agregar Producto</button></div></h3>
                    {el.categoryProducts?.map((e : any) => {

                        return (
                            <Cartita  deleted={deleted} onProducEdit={onProducEdit} e={e}/>
                        )
                    })}
                <a href='#pFoodsFilter'><button id='irArribaButton' className={buttonClassTeal}>Ir arriba</button></a>
                </div>
            ) : null
        })
        }
    </div>
  )
}

export default ProductsList