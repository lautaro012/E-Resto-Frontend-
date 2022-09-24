import { useState } from "react";

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
        <div>
            <form onSubmit={(event) => handleSubmit(event)}>
                <input
                    id="searchbar"
                    type='text'
                    placeholder="Search..."
                    onChange={(event) => handleInput(event)}
                />
                <button type="submit" >Search</button>
            </form>
        </div>
    )

}