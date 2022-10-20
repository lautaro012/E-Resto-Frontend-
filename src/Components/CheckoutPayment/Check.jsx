
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'
import { createOrder, deleteItemFromCart, getUser } from "../../redux/actions";
import { useAppDispatch, useAppSelector } from '../../config';
//import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";
import './Check.css'

export default function Check({ precio, subtotal, propina }) {

  let publishableKey = 'pk_test_51Lde2sJXnqrwcfODw8cWGGVzyavpCNgaUXMhWTAbkGIJ3txhY9PVGuUzy9QPzQ5riddbQZdRADa3QTHxqhrSeSZq00dWuMhBM2'
  const items = useAppSelector((state) => state.cart)
  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  //const navigate = useNavigate()
  let token = localStorage.getItem("token");
  const payNow = async token => {

    try {
      const response = await axios({
        url: '/payment',
        method: 'post',
        data: {
          amount: precio * 100,
          token,
        }
      })
      if (response.status === 200) {
        console.log(token.card.address_line1)
        let cantidad = items.map(item => {
          return {
            name: item.name,
            cant: item.cantidad
          }
        })
        let products = items.map(item => {
          return item.name
        })

        let payload = {
          user_id: user._id,
          date: new Date().toString(),
          payment: 'Stripe',
          subtotal: subtotal,
          propina: propina,
          total: precio,
          paid: true,
          products: products,
          cantidad: cantidad,
          items: items
        }

        dispatch(createOrder(payload));
        dispatch(deleteItemFromCart("All"));
        dispatch(getUser(JSON.parse(token)));
        swal({ title: ('COMPRA EXITOSA') })
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='stripe_modal'>
      <h1>Tarjeta de credito</h1>
      <StripeCheckout
        stripeKey={publishableKey}
        label='Pagar Ahora'
        billingAddress
        shippingAddress
        amount={precio * 100}
        description='Finaliza tu compra'
        token={payNow}
      />
    </div>
  )
}