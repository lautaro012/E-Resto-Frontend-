import React, { useEffect } from 'react'
import jwt_decode from 'jwt-decode'


const Login = () => {
    function handleCallbackResponse(response) {
        console.log(jwt_decode(response.credential))
    }
    useEffect(() => {

        /* global google */

        google.accounts.id.initialize({
            client_id: "386663355164-fbij6h4rkmrfct883apbvqc0234k6ad5.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });
        google.accounts.id.renderButton(
            document.getElementById('signInDiv'),
            {theme: 'outline', size: 'large'}
        );
        google.accounts.id.prompt()
    },[])
  
    return (
    <div>
        <div id='signInDiv'></div>
    </div>
  )
}

export default Login