
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'
import { createOrder, deleteItemFromCart } from "../../redux/actions";
import { useAppDispatch, useAppSelector } from '../../config';
import { useNavigate } from 'react-router-dom';

export default function Check({ precio }) {

  let publishableKey = 'pk_test_51Lde2sJXnqrwcfODw8cWGGVzyavpCNgaUXMhWTAbkGIJ3txhY9PVGuUzy9QPzQ5riddbQZdRADa3QTHxqhrSeSZq00dWuMhBM2'
  const items = useAppSelector((state) => state.cart)
  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const payNow = async token => {

    try {
      const response = await axios({
        url: 'http://localhost:3001/payment',
        method: 'post',
        data: {
          amount: precio * 100,
          token,
        }
      })
      if (response.status === 200) {

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
          user_id : user._id,
          date: new Date().toString(),
          payment: 'Stripe',
          subtotal: precio,
          paid: true,
          description: 'no se para que poner description',
          products: products,
          cantidad: cantidad
        }

        dispatch(createOrder(payload))
        dispatch(deleteItemFromCart("All"))
        alert('COMPRA EXITOSA')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>Tarjeta de credito</h1>
      <StripeCheckout
        stripeKey={publishableKey}
        label='Pay Now'
        billingAddress
        shippingAddress
        amount={precio * 100}
        description='Finaliza tu compra'
        token={payNow}
      />
    </div>
  )
}