import { useState } from "react";
import './RegisterForm.css'
import {
  buttonclass,
  inputRegister,
} from "../../Style/Clases/Clases";
import { Input } from "../../Interfaces/Interfaces";
import { useAppDispatch } from "../../config";
import { createUser } from "../../redux/actions";

export default function Register() {


    let dispatch = useAppDispatch()
  const [input, setInput] = useState({
    name: '',
    lastName: '',
    userName: '',
    adress: '',
    password: '',
    mail: '',
    img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW2zB9ZfnqjeJkkgqMS7zen-NVpatbD9U3tiEirtof0QIA8Cx3ApChLYPJO9hVdncSkrA&usqp=CAU',
    admin: false
})


  const handleChange = (e: Input )  => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault()
    dispatch(createUser(input));
    console.log('submiteado', input)
    setInput({
        name: '',
        lastName: '',
        userName: '',
        adress: '',
        password: '',
        mail: '',
        img:'https://citizengo.org/sites/default/files/images/test_3.png',
        admin: false
    })
  }
  return (
    <div className="register-conteiner">
      <form onSubmit={handleSubmit}>
        <div className="image-subida">
          <img width={350} src={input.img} alt='test-img'/> 
        </div>
        <div className="duo-input">
          <div className="mb-3 xl:w-96">
            <label
              htmlFor="name"
              className="form-label inline-block mb-2 text-gray-700"
            >
              Nombre:
            </label>
            <input
              autoComplete="username"
              type="text"
              name='name'
              className={inputRegister}
              onChange={handleChange}
              id="name"
              placeholder="Nombre"
            />
          </div>
          <div className="mb-3 xl:w-96">
            <label
              htmlFor="lastName"
              className="form-label inline-block mb-2 text-gray-700"
            >
              Apellido:
            </label>
            <input
              type="text"
              name='lastName'
              className={inputRegister}
              onChange={handleChange}
              id="lastName"
              placeholder="Apellido"
            />
          </div>
        </div>
        <div className="duo-input">
          <div className="mb-3 xl:w-96">
            <label
              htmlFor="userName"
              className="form-label inline-block mb-2 text-gray-700"
            >
              Usuario:
            </label>
            <input
              autoComplete="username"
              type="text"
              name='userName'
              className={inputRegister}
              onChange={handleChange}
              id="userName"
              placeholder="Nombre de Usuario"
            />
          </div>
          <div className="mb-3 xl:w-96">
            <label
              htmlFor="mail"
              className="form-label inline-block mb-2 text-gray-700"
            >
              E-mail:
            </label>
            <input
              type="email"
              name="mail"
              className={inputRegister}
              onChange={handleChange}
              id="mail"
              placeholder="E-mail"
            />
          </div>
        </div>
        <div className="duo-input">
          <div className="mb-3 xl:w-96">
            <label
              htmlFor="password"
              className="form-label inline-block mb-2 text-gray-700"
            >
              Contraseña:
            </label>
            <input
                autoComplete="new-password"
              type="password"
              name='password'
              className={inputRegister}
              onChange={handleChange}
              id="password"
              placeholder="Contraseña"
            />
          </div>
          <div className="mb-3 xl:w-96">
            <label
              htmlFor="repeat-password"
              className="form-label inline-block mb-2 text-gray-700"
            >
              Repita su contraseña:
            </label>
            <input
                 autrepeat-oComplete="new-password"
              type="repeat-password"
              name='repeat-password'
              className={inputRegister}
              onChange={handleChange}
              id="repeat-password"
              placeholder="Repita la Contraseña"
            />
          </div>
        </div>
          <div className="duo-input">
          <div className="mb-3 xl:w-96">
              <label
                htmlFor="adress"
                className="form-label inline-block mb-2 text-gray-700"
              >
                Direccion:
              </label>
              <input
                type="text"
                name='adress'
                className={inputRegister}
                onChange={handleChange}
                id="adress"
                placeholder="Direccion"
              />
            </div>
            <div className="mb-3 xl:w-96">
              <label
                htmlFor="img"
                className="form-label inline-block mb-2 text-gray-700"
              >
                Imagen:
              </label>
              <input
                type="url"
                name='img'
                className={inputRegister}
                onChange={handleChange}
                id="img"
                placeholder="Ingrese un URL de su imagen"
              />
            </div>
          </div>
        <button className={buttonclass}>Registrarse</button>
      </form>
    </div>
  );
}
