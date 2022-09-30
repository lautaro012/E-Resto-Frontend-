import React, { useState } from "react";
import '../SearchBar/SearchBar.css'
import lupa from '../../Style/images/lupa.png'
import { getProductsByName } from "../../redux/actions";
import { useAppDispatch } from "../../config";

export default function SearchBar() {

    const [name, setName] = useState<String>("")
     let dispatch = useAppDispatch()

    function handleInput(event:React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value)
    }

    function handleSubmit(event:React.FormEvent<HTMLFormElement>) {
        console.log(name)
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
                <button type="submit" className="formButtonSearchBarStyle" >
                <img src={lupa} alt="lupa" width='20' className='lupitaImgButtonStyle'/>
                </button>
            </form>
        </div>
    )

}