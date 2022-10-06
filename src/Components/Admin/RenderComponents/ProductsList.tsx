import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../config'
import { getCategories } from '../../../redux/actions'
import { buttonclass, buttonClassTeal, listUsuariosRegistrados, mailUsuarioRegistrado, nameUsuarioRegistrado } from '../../../Style/Clases/Clases'

const ProductsList = () => {
    let cats = useAppSelector((state) => state.categories)

    let dispatch = useAppDispatch()

    console.log(cats)
    useEffect(() => {
        dispatch(getCategories('AZ'))
    }, [dispatch])


  return (
    <div className='firstDivProductSizing'>
        {cats.map((el:any) => {
            return(
                <div id={el.name}>
                    <h3>{el.name}</h3>
                    {el.categoryProducts?.map((e : any) => {
                        return (
                    
                            <div className="flow-root">
                                    <ul role="list" className={listUsuariosRegistrados}>
                                        <li className="py-3 sm:py-4">
                                            <div className="flex items-center space-x-4">
                                                <div className="flex-shrink-0">
                                                    <img className="w-8 h-8 rounded-full" src={e.img} alt="Product image"/>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className={nameUsuarioRegistrado}>
                                                        {e.name}
                                                    </p>
                                                    <p className={mailUsuarioRegistrado}>
                                                        {e.decription}
                                                    </p>
                                                </div>
                                                <div>
                                                    <button className={buttonclass}>Editar Producto</button>
                                                    <button className={buttonclass}>Eliminar Producto</button>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                            </div>
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