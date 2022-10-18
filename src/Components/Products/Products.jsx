import { Carousel } from '3d-react-carousal';
import { Button } from 'flowbite-react';
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../config'
import { getProducts } from '../../redux/actions';
import './Products.css'
import ProducCard from './Produc_card';

export default function Products() {

    const items = useAppSelector((state) => state.products)
    const dispatch = useAppDispatch()
    //const [indexNum, setIndexNum] = useState(0)

    useEffect(() => {
        dispatch(getProducts("AZ"))
    }, []);

    const imagenes = items.filter(img => img.name === "Pizza Muzzarella" || img.name === "Sandwich Lomito Clásico" || img.name === "Mila Completa" || img.name === "Sorrentinos de Jamón & Queso")

    let imagen = []

    const callback = function (index) {
        console.log("callback", index);
    }

    imagenes.map((item) => {
        imagen.push(
            // <img src={img.img} alt={img.name} className="ifmagen_carrousel" />
            <ProducCard item={item}></ProducCard>
        )
    })

    return (
        <div className='contener_max_carrousel'>
            {/* <h1 className='producto-background'>Hery's Resto</h1> */}
            <div className='conteiner_carrousel'>
                <Carousel slides={imagen} autoplay={false} interval={3000} onSlideChange={callback} />
            </div>
        </div>
    )
}