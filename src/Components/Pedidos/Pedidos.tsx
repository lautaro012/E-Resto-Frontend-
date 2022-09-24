import Card from '../Card/Card'
import Pizzas from '../../_temp/Pizzas.json'

export default function Pedidos() {

    return (
        <div>
            {
                Pizzas.length > 0 ?

                    typeof Pizzas === "object" ?

                        Pizzas.map(recipe => {
                            return (
                                <div key={recipe.name} >
                                    <Card name={recipe.name} image={recipe.img} price={recipe.price}/>
                                </div>
                            )
                        })
                        :
                        <h5>No hay comidas</h5>
                    :
                    <div>
                        <h5>Loading...</h5>
                    </div>
            }
        </div>
    )
}