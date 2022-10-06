import  {useEffect, useState } from 'react'
import UserList from './RenderComponents/UserList'
import './Admin.css'
import { buttonclass, firstDiv } from '../../Style/Clases/Clases'
import ProductsList from './RenderComponents/ProductsList'

const Admin = () => {
  const [render, setRender] = useState('registeredUsers')


  return (
    
    <div className='divAdminContainer'>
        <div className={firstDiv} id='leftAdminContainer'>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW2zB9ZfnqjeJkkgqMS7zen-NVpatbD9U3tiEirtof0QIA8Cx3ApChLYPJO9hVdncSkrA&usqp=CAU' className='w-60 h-60 rounded-full'></img>
          <button id='adminButtonSizing' className={buttonclass} onClick={() => setRender('registeredUsers')}>Usuarios Registrados</button>
          <button id='adminButtonSizing' className={buttonclass} onClick={() => setRender('bannedUsers')} >Usuarios Baneados</button>
          <button id='adminButtonSizing' className={buttonclass} onClick={() => setRender('adminUsers')} >Administradores</button>
          <button id='adminButtonSizing' className={buttonclass} onClick={() => setRender('allProducts')} >Productos Disponibles</button>
          <button id='adminButtonSizing' className={buttonclass} onClick={() => setRender('newProduct')} >Crear Producto Nuevo</button>


        </div>
        <div className={firstDiv} id='rightAdminContainer'>
          {render && render === "registeredUsers" || render === "bannedUsers" || render === "adminUsers" ?
            <UserList render={render} /> 

            : render === "allProducts" ? 
              <div>
                <div className='spanFoodsFilter'>
                <p id='pFoodsFilter' className={buttonclass}>
                <a href='#Pastas'>Pastas</a> <a href='#Milanesas'>Milanesas</a> <a href='#Papas'>Papas</a> <a href='#Sandwiches'>Sandwiches</a> <a href='#Pizzas'>Pizzas</a> <a href='#Ensaladas'>Ensaladas</a> <a href='#Bebidas sin Alcohol'>Bebidas sin Alcohol</a>
                </p>
                </div>
          
              <ProductsList/>
              </div>

            :
            <div>ACA VA EL FORM DE CREACIÓN</div>
          }
          
        </div>
    </div>
  )
}

export default Admin