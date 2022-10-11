
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'
import { deleteItemFromCart } from "../../redux/actions";
import { useAppDispatch } from '../../config';

export default function Check({ precio }) {

  let publishableKey = 'pk_test_51Lde2sJXnqrwcfODw8cWGGVzyavpCNgaUXMhWTAbkGIJ3txhY9PVGuUzy9QPzQ5riddbQZdRADa3QTHxqhrSeSZq00dWuMhBM2'
  const dispatch = useAppDispatch()

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
        dispatch(deleteItemFromCart("All"))
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