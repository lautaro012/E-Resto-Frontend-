import React, { useEffect, useRef } from 'react'
import jwt_decode from 'jwt-decode'
import { useAppDispatch } from '../../config'
import { logUser } from '../../redux/actions'
import { useNavigate } from 'react-router-dom'


export default function GoogleLoggin() {
    // password,lastName,userName,name,google
    const divRef = useRef(null);

    const theme = localStorage.getItem("theme")
    let dispatch = useAppDispatch()
    let navigate = useNavigate()
    function handleCallbackResponse(response) {
        const data = jwt_decode(response.credential)
        const input = {
            mail: data.email,
            password: 'SECRET_PASSWORD',
            lastName: data.given_name,
            userName: data.name,
            name: data.family_name,
            google: true,
            img: data.picture,
            adress: 'Av. Simpre Viva N° 742'
        }
        dispatch(logUser(navigate, input));
    }
    useEffect(() => {

        /* global google */
        if(window.google) {
            googleLogin()
        }
        
        //google.accounts.id.prompt()
    }, [])

    function googleLogin () {
        google.accounts.id.initialize({
            client_id: "386663355164-fbij6h4rkmrfct883apbvqc0234k6ad5.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });
        google.accounts.id.renderButton(
            divRef.current,
            { theme: theme === 'dark' ? 'large' : 'filled_black' , size: 'large' }
        );
    }




    return (
        <div>
            <div ref={divRef} id='SIGNGOOGLE'></div>
        </div>
    )
}