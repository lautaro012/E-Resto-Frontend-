import React, { useState } from "react";
import '../SearchBar/SearchBar.css'
import { getProductsByName } from "../../redux/actions";
import { useAppDispatch } from "../../config";
import { buttonclass } from "../../Style/Clases/Clases";

export default function SearchBar() {

    const [name, setName] = useState<String>("")
     let dispatch = useAppDispatch()

    function handleInput(event:React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value)
    }

    function handleSubmit(event:React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        dispatch(getProductsByName(name))
        setName("")
    }


    return (
        <div className="divPrueba">
            <form onSubmit={(event) => handleSubmit(event)} className='formSearchBarStyle'>
                <input
                    id="searchbar"
                    type='text'
                    placeholder="Search..."
                    onChange={(event) => handleInput(event)}
                    className='inputFormSearchBarStyle'
                />
                <button type="submit" className={buttonclass}>
                <img src='https://res.cloudinary.com/luubermudezz/image/upload/v1664738482/E-Commerce%20Food/lupa2_xjnr8f.png' alt="lupa" width='20' className='lupitaImgButtonStyle'/>
                </button>
            </form>
        </div>
    )

}