import React from 'react'
import UserList from './RenderComponents/UserList'
import './Admin.css'
import { buttonclass, firstDiv } from '../../Style/Clases/Clases'
import NavBar from '../NavBar/NavBar'

const Admin = () => {
  return (
    
    <div className='divAdminContainer'>
        <div className={firstDiv} id='leftAdminContainer'>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW2zB9ZfnqjeJkkgqMS7zen-NVpatbD9U3tiEirtof0QIA8Cx3ApChLYPJO9hVdncSkrA&usqp=CAU' className='w-60 h-60 rounded-full'></img>
          <button className={buttonclass}>Administrar Usuarios</button>
          <button className={buttonclass}>Administrar Productos</button>

        </div>
        <div className={firstDiv} id='rightAdminContainer'>
          <UserList/>
        </div>
    </div>
  )
}

export default Admin