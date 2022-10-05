
import axios from 'axios'
import React, { useState } from 'react'
import StripeCheckout from 'react-stripe-checkout'

const Check = () => {
  let publishableKey = 'pk_test_51Lde2sJXnqrwcfODw8cWGGVzyavpCNgaUXMhWTAbkGIJ3txhY9PVGuUzy9QPzQ5riddbQZdRADa3QTHxqhrSeSZq00dWuMhBM2'
  const [product, setProduct] = useState({
    name: 'Producto prueba',
    price: 10
  })
  let priceStripe =  product.price * 100
  const payNow = async token => {
    try {
      const response = await axios({
        url: 'http://localhost:3001/payment',
        method: 'post',
        data: {
          amount: priceStripe,
          token,
        }
      })
      if(response.status === 200) {
        console.log('payment successful')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>Prueba pago</h1>
      <p>
        <span>Producto:</span>
          {product.name}
      </p>
      <p>
        Price: {product.price}
      </p>
      <StripeCheckout
        stripeKey={publishableKey}
        label='Pay Now'
        billingAddress
        shippingAddress
        amount={priceStripe}
        description='Finaliza tu compra'
        token={payNow}
      />
    </div>
  )
}

export default Check