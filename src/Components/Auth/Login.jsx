import React, { useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { useAppDispatch } from '../../config'
import { logUser } from '../../redux/actions'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    // password,lastName,userName,name,google

    let dispatch = useAppDispatch()
    let navigate = useNavigate()
    function handleCallbackResponse(response) {
        const data = jwt_decode(response.credential)
        console.log(data)
        const input = {
            mail: data.email,
            password: 'SECRET_PASSWORD',
            lastName: data.given_name,
            userName: data.name,
            name: data.family_name,
            google:true,
            img: data.picture,
            adress: 'Av. Simpre Viva N° 742'
        }
        dispatch(logUser(navigate, input));
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
        //google.accounts.id.prompt()
    },[])
  
    return (
    <div>
        <div id='signInDiv'></div>
    </div>
  )
}

export default Login