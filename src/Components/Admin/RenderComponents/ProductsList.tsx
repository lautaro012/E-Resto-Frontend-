import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../config'
import { deleteProduct, getCategories } from '../../../redux/actions'
import { buttonclass, buttonClassTeal } from '../../../Style/Clases/Clases'
import Cartita from './Cartita'
import './ProductsList.css'

const ProductsList = ({onProducEdit, openForm}:any) => {
    let dispatch = useAppDispatch()
    let cats = useAppSelector((state) => state.categories)
    
    useEffect(() => {
        dispatch(getCategories('AZ'))
    }, [getCategories])
    
    const deleted = (id:any) => {
        dispatch(deleteProduct(id));
        dispatch(getCategories('AZ'))
    }
  return (
    <div className='firstDivProductSizing'>
        {cats.map((el:any) => {
            return(
                <div id={el.name}>
                    <h3><div className='name-addProduct'>{el.name} <button onClick={openForm}>+ Agregar Producto</button></div></h3>
                    {el.categoryProducts?.map((e : any) => {
                        return (
                            <Cartita deleted={deleted} onProducEdit={onProducEdit} e={e}/>
                        )
                    })}
                <a href='#pFoodsFilter'><button id='irArribaButton' className={buttonClassTeal}>Ir arriba</button></a>
                </div>
            )
        })
        }
    </div>
  )
}

export default ProductsList