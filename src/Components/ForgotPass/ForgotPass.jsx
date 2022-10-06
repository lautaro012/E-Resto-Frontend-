import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../config'
import { getUserById } from '../../redux/actions'
import { buttonclass } from '../../Style/Clases/Clases'


export default function ForgotPass () {
    let {id} = useParams()
    let dispatch = useAppDispatch()

    const userDetail = useAppSelector((state) => state.userDetail)

    useEffect(() => {
        dispatch(getUserById(id))
    }, [dispatch])


  return (
    <div>
      <h3>Hola {userDetail.userName}!</h3>
      <p>Completa los campos para recuperar tu contraseña</p>
      <form>
        <input type="password" placeholder='Nueva contraseña' />
        <input type="password" placeholder='Repetir contraseña'/>
        <button type='submit' className={buttonclass}>Guardar Cambios</button>
      </form>
    </div>
  )
}

