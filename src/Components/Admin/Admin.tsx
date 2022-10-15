import { useEffect, useState } from 'react'
import UserList from './RenderComponents/UserList'
import './Admin.css'
import { buttonclass, firstDiv } from '../../Style/Clases/Clases'
import ProductsList from './RenderComponents/ProductsList'
import Register from '../RegisterForm/RegisterForm'
import { CardForm } from '../../Interfaces/Interfaces'
import Form from '../Form/Form'
import NavBar from '../NavBar/NavBar'
import Orderlist from './RenderComponents/OrderList/OrderList'

const Admin = () => {
  const [render, setRender] = useState('registeredUsers')
  const [editProduct, seteditProduct] = useState<Boolean>(false);
  const [createProduct, setCreateProduct] = useState<Boolean>(false)
  const [showModal, setShowModal] = useState<boolean | undefined>(true);


  const [formData, setFormData] = useState<CardForm>({
    name: "test",
    img: "https://citizengo.org/sites/default/files/images/test_3.png",
    price: 0,
    description: "test-description",
    off: 0,
    stock: 0,
    rating: 3,
    category: "",
    newProduct: true,
  });

  const onProducEdit = (input: CardForm) => {
    seteditProduct(true);
    setFormData(input);
    setShowModal(true);
  };
  const openForm = (value:string) => {
    setFormData({
      ...formData,
      category:value
    })
    setCreateProduct(true)
    setShowModal(true)
  }

  return (
    <div className='divAdminContainer'>
      <div className={firstDiv} id='leftAdminContainer'>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW2zB9ZfnqjeJkkgqMS7zen-NVpatbD9U3tiEirtof0QIA8Cx3ApChLYPJO9hVdncSkrA&usqp=CAU' alt='test' className='w-60 h-60 rounded-full'></img>
        <button id='adminButtonSizing' className={buttonclass} onClick={() => setRender('allOrders')} >Administrar Pedidos</button>
        <button id='adminButtonSizing' className={buttonclass} onClick={() => setRender('registeredUsers')}>Usuarios Registrados</button>
        <button id='adminButtonSizing' className={buttonclass} onClick={() => setRender('bannedUsers')} >Usuarios Baneados</button>
        <button id='adminButtonSizing' className={buttonclass} onClick={() => setRender('adminUsers')} >Administradores</button>
        <button id='adminButtonSizing' className={buttonclass} onClick={() => setRender('allProducts')} >Administrar Productos</button>

      </div>
      <div className={firstDiv} id='rightAdminContainer'>
        {render && render === "registeredUsers" || render === "bannedUsers" || render === "adminUsers" ?
          <UserList render={render} />

          : render === "allProducts" ?
            <div data-aos="fade-left" data-aos-duration="1500">
              <div className='spanFoodsFilter'>
                <p id='pFoodsFilter' className={buttonclass}>
                  <a href='#PastasAd'>Pastas</a> <a href='#MilanesasAd'>Milanesas</a> <a href='#PapasAd'>Papas</a> <a href='#SandwichesAd'>Sandwiches</a> <a href='#PizzasAd'>Pizzas</a> <a href='#EnsaladasAd'>Ensaladas</a> <a href='#Bebidas sin AlcoholAd'>Bebidas sin Alcohol</a><a href='#PostresAd'>Postres</a> <a href='#HamburguesasAd'>Hamburguesas</a> <a href='#CervezasAd'>Cervezas</a> 
                </p>
              </div>

              <ProductsList setFormData={setFormData} openForm={openForm} onProducEdit={onProducEdit} />
            </div>
          : render === 'allOrders' ?
            <Orderlist></Orderlist>
            :
            null
        }
        {
          createProduct ? (
            <Form
              setShowModal={setShowModal}
              showModal={showModal}
              setFormData={setFormData}
              newProduct={true}
              formData={formData}
              seteditProduct={seteditProduct}
              setCreateProduct={setCreateProduct}
            />
          )
            :
            null
        }
        {
          editProduct ? (
            <Form
              setShowModal={setShowModal}
              showModal={showModal}
              setFormData={setFormData}
              newProduct={false}
              formData={formData}
              seteditProduct={seteditProduct}
              setCreateProduct={setCreateProduct}
            />
          )
            :
            null
        }
      </div>
    </div>
  )
}

export default Admin