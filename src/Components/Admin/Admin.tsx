import { useState } from 'react'
import UserList from './RenderComponents/UserList'
import './Admin.css'
import { buttonclass, firstDiv } from '../../Style/Clases/Clases'
import ProductsList from './RenderComponents/ProductsList'
import { CardForm } from '../../Interfaces/Interfaces'
import Form from '../Form/Form'
import Orderlist from './RenderComponents/OrderList/OrderList'
import DeliveryRegister from './RenderComponents/DeliveryRegister'
import { useAppSelector } from '../../config'

export default function Admin() {

  const user = useAppSelector((state) => state.user)
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
  const openForm = (value: string) => {
    setFormData({
      ...formData,
      category: value
    })
    setCreateProduct(true)
    setShowModal(true)
  }

  return (
    <div className='divAdminContainer'>
      <div className={firstDiv} id='leftAdminContainer'>
        <aside className='User_options'>
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">{user.userName}</h1>
            <img src={user.img} alt={user.name} />
          </div>
          <hr />
          <button id='adminButtonSizing' className={buttonclass} onClick={() => setRender('allOrders')} >Administrar Pedidos</button>
          <button id='adminButtonSizing' className={buttonclass} onClick={() => setRender('registeredUsers')}>Usuarios Registrados</button>
          <button id='adminButtonSizing' className={buttonclass} onClick={() => setRender('bannedUsers')} >Usuarios Baneados</button>
          <button id='adminButtonSizing' className={buttonclass} onClick={() => setRender('adminUsers')} >Administradores</button>
          <button id='adminButtonSizing' className={buttonclass} onClick={() => setRender('allProducts')} >Administrar Productos</button>
          <button id='adminButtonSizing' className={buttonclass} onClick={() => setRender('newDelivery')} >Registrar Repartidores</button>
        </aside>
      </div>
      <div className={firstDiv} id='rightAdminContainer'>
        {
          render && (render === "registeredUsers" || render === "bannedUsers" || render === "adminUsers" ) ?
            <UserList render={render} />
            :
            render === "allProducts" ?
              <div data-aos="fade-left" data-aos-duration="500">
                <div className='spanFoodsFilter'>
                  <p id='pFoodsFilter' className={buttonclass}>
                    <a href='#PastasAd'>Pastas</a> <a href='#MilanesasAd'>Milanesas</a> <a href='#PapasAd'>Papas</a> <a href='#SandwichesAd'>Sandwiches</a> <a href='#PizzasAd'>Pizzas</a> <a href='#EnsaladasAd'>Ensaladas</a> <a href='#Bebidas sin AlcoholAd'>Bebidas sin Alcohol</a><a href='#PostresAd'>Postres</a> <a href='#HamburguesasAd'>Hamburguesas</a> <a href='#CervezasAd'>Cervezas</a>
                  </p>
                </div>

                <ProductsList setFormData={setFormData} openForm={openForm} onProducEdit={onProducEdit} />
              </div>
              :
              render === 'allOrders' ?
                <Orderlist></Orderlist>
                :
                render === 'newDelivery' ?
                  <DeliveryRegister />
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