import { Button } from 'flowbite-react'
import './Produc_card.css'

export default function ProducCard({ item }: any) {

    console.log(item)
    return (
        <div>
            <img src={item.img} alt={item.name} className="imagen_carrousel" />
            <h1 id='h1_imagen_carrousel'>{item.name}</h1>
            <Button color="warning" pill={true} id="boton_imagen_carrousel">Ir a catalogo</Button>
        </div>
    )
}