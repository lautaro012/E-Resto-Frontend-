import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../config'
import { editUser, getUserById } from '../../redux/actions'
import { buttonclass } from '../../Style/Clases/Clases'
import swal from "sweetalert";
import './Pass.css'


export default function ForgotPass() {
  let { id } = useParams()
  let dispatch = useAppDispatch()
  const [firstPass, setFirstPass] = useState('')
  const [secondPass, setSecondPass] = useState('')
  const [input, setInput] = useState({
    password: firstPass
  })

  const userDetail = useAppSelector((state) => state.userDetail)

  const handleChange = (e) => {
    if (e.target.name == 'passFirst') {
      setFirstPass(e.target.value)

    } else {
      setSecondPass(e.target.value)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    if (firstPass === secondPass) {
      dispatch(editUser(id, input))
    } else {
      swal({ title: 'Las constraseñas no coinciden' })
    }
  }

  useEffect(() => {
    dispatch(getUserById(id))
  }, [dispatch])

  useEffect(() => {
    setInput({
      password: firstPass
    })
  }, [firstPass])


  return (
    <div className='forgot_password'>
      <h3>Hola {userDetail.userName}!</h3>
      <p>Completa los campos para recuperar tu contraseña</p>
      <form onSubmit={(e) => handleSubmit(e)} >
        <input onChange={(e) => handleChange(e)} name='passFirst' type="password" placeholder='Nueva contraseña' required />
        <input onChange={(e) => handleChange(e)} name='passSecond' type="password" placeholder='Repetir contraseña' required />
        <button type='submit' className={buttonclass}>Guardar Cambios</button>
      </form>
    </div>
  )
}

