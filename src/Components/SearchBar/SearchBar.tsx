import { useState } from "react";
import '../SearchBar/SearchBar.css'
import lupa from '../../Style/images/lupa.png'

export default function SearchBar() {

    const [name, setName] = useState<String>("")

    function handleInput(event:React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value)
    }

    function handleSubmit(event:React.FormEvent<HTMLFormElement>) {
        console.log(name)
        event.preventDefault()
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
                <button type="submit" className="formButtonSearchBarStyle">
                <img src={lupa} alt="lupa" width='20' className='lupitaImgButtonStyle'/>
                </button>
            </form>
        </div>
    )

}