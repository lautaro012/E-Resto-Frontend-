import { useAppDispatch } from '../../config'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { modificarUser } from '../../redux/actions';
import { stringify } from 'querystring';


export default function DatosPerfil(data: any) {

    let { name, lastName, adress, mail, userName, _id, baneado } = data.data

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    //const [errors, setErrors] = useState<any>({})

    const [input, setInput] = useState<any>({})

    function handleInput(event: any) {
        event.preventDefault()
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
        // setErrors(validations({
        //     ...input,
        //     [event.target.name]: event.target.value
        // }))
    }

    // const validations = (input: any) => { // VARIABLE PARA GUARDAR UN MENSAJE EN CASO DE FALTANTES DEL INPUT
    //     let errors = {}
    //     for (const key in input) {
    //         if (!input[key]) {
    //             errors[key] = `Is ${key} required`
    //         }
    //         else if (input[key]?.trim().length < 3) { //el .trim() saca los espacios del inicio y el fin de la palabra
    //             errors[key] = "Must be at least 3 characters"
    //         }
    //         else if ((/[^a-zA-Z0-9 ]/.test(input[key]))) { //validacion para que el name no pueda contener caracteres especiales
    //             if (key !== "img") {
    //                 errors[key] = "Can't contain special characters"
    //             }
    //         }
    //     }
    //     return errors
    // }

    function handleSubmit(event: any) {
        event.preventDefault()
        // let error = validations(input)
        // let error2 = Object.keys(error)

        // if (error2.length > 0) {
        //     swal({ title: 'Debe salvar errores' })
        // }
        // else if (Object.keys(input).length === 0) {
        //     swal({ title: "Nothing to edit" })
        // }
        // else {
        //     dispatch(modificarUser(_id, input))
        //     swal({ title: "User edited!" })
        //     setInput({})
        // }
        console.log("INPUT", input)
        dispatch(modificarUser(_id, input))
        swal({ title: "Usuario editado!" })
        setInput({})
        navigate("/")
    }

    const [form, setForm] = useState("")

    function abrirForm(event: any, nombreDelInput: any) {
        event.preventDefault()
        setForm(nombreDelInput)
    }

    // async function handleImageChange(e: any) {
    //     if (e.target.files && e.target.files[0]) {
    //         const data = new FormData()
    //         data.append("file", e.target.files[0])
    //         data.append("upload_preset", "gamesAPI")
    //         fetch(
    //             "https://api.cloudinary.com/v1_1/luubermudezz/image/upload", {
    //             method: "POST",
    //             body: data
    //         }
    //         ).then(resp => resp.json())
    //             .then(file => {
    //                 if (file) {
    //                     setInput({
    //                         ...input,
    //                         img: `${file.secure_url}`
    //                     })
    //                 }
    //             })
    //     }
    // }

    return (
        <div className="modificar_perfil">
            <h1>Mi perfil</h1>
            <div>
                <h2>{mail}</h2>
                {
                    baneado === false ?
                        <h2>Estado : Online 🟢</h2>
                        :
                        <h2>Estado : Baneado ⛔</h2>
                }
            </div>
            <hr></hr>
            <form onSubmit={(event) => handleSubmit(event)} className="Form">
                <div className="Label">
                    <h2>User</h2>
                    <label>{userName}</label>
                    <button onClick={(event) => abrirForm(event, "user name")}>Editar</button>
                    {
                        form && form === "user name" ?
                            <div>
                                <input
                                    id="User"
                                    type='text'
                                    size={80}
                                    value={input.userName}
                                    name='userName'
                                    placeholder="User..."
                                    onChange={(event) => handleInput(event)}
                                />
                                {/* {
                                    !errors.userName ? null : <span>{errors.userName}</span>
                                } */}
                                <button onClick={(event) => abrirForm(event, "")}>X</button>
                            </div>
                            :
                            null
                    }
                </div>
                <hr></hr>
                <div className="Label">
                    <h2>Nombre</h2>
                    <label>{name}</label>
                    <button onClick={(event) => abrirForm(event, "name")}>Editar</button>
                    {
                        form && form === "name" ?
                            <div>
                                <input
                                    required
                                    id="Name"
                                    type='text'
                                    size={80}
                                    value={input.name}
                                    name='name'
                                    placeholder="Nombre..."
                                    onChange={(event) => handleInput(event)}
                                />
                                {/* {
                                    !errors.name ? null : <span>{errors.name}</span>
                                } */}
                                <button onClick={(event) => abrirForm(event, "")}>X</button>
                            </div>
                            :
                            null
                    }

                </div>
                <hr></hr>
                <div className="Label">
                    <h2>Apellido</h2>
                    <label>{lastName}</label>
                    <button onClick={(event) => abrirForm(event, "last name")}>Editar</button>
                    {
                        form && form === "last name" ?
                            <div>
                                <input
                                    id="Last name"
                                    type='text'
                                    size={80}
                                    value={input.lastName}
                                    name='lastName'
                                    placeholder="Apellido..."
                                    onChange={(event) => handleInput(event)}
                                />
                                {/* {
                                    !errors.lastName ? null : <span>{errors.lastName}</span>
                                } */}
                                <button onClick={(event) => abrirForm(event, "")}>X</button>
                            </div>
                            :
                            null
                    }

                </div>
                <hr></hr>
                <div className="Label">
                    <h2>Direccion</h2>
                    <label>{adress}</label>
                    <button onClick={(event) => abrirForm(event, "address")}>Editar</button>
                    {
                        form && form === "address" ?
                            <div>
                                <input
                                    id="Address"
                                    type='text'
                                    size={80}
                                    value={input.adress}
                                    name='adress'
                                    placeholder="Direccion..."
                                    onChange={(event) => handleInput(event)}
                                />
                                {/* {
                                    !errors.adress ? null : <span>{errors.adress}</span>
                                } */}
                                <button onClick={(event) => abrirForm(event, "")}>X</button>
                            </div>
                            :
                            null
                    }
                </div>
                <hr></hr>
                <div className="Label">
                    <h2>Foto de perfil</h2>
                    <button id="edit_img" onClick={(event) => abrirForm(event, "image")}>Editar</button>
                    {
                        form && form === "image" ?
                            <div>
                                <input
                                    type='text'
                                    size={80}
                                    name='img'
                                    placeholder="Inserte una URL para su foto de perfil"
                                    onChange={(event) => handleInput(event)}
                                />
                                {/* {
                                    !errors.img ? null : <span>{errors.img}</span>
                                } */}
                                <button onClick={(event) => abrirForm(event, "")}>X</button>
                            </div>
                            :
                            null
                    }
                </div>
                <hr></hr>
                <button id="submit" type="submit">Editar usuario</button>
            </form>
        </div>
    )
}