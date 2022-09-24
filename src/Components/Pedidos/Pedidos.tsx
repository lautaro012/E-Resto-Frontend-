import Card from '../Card/Card'
import Comidas from '../../_temp/Comidas.json'
import '../Pedidos/Pedidos.css'
import SearchBar from './SearchBar'

export default function Pedidos() {

    return (
        <div className='Contenedor'>
            <SearchBar></SearchBar>
            {
                Comidas.length > 0 ?

                    typeof Comidas === "object" ?
                        Comidas.map(categoria => {
                            return (
                                <div className='Categoria'>
                                    <h3>{Object.keys(categoria)} ( {Object.values(categoria)[0].length} )</h3>
                                    <div className='Contenedor_cartas'>
                                        {
                                            Object.values(categoria)[0].map((comida: any) => {
                                                return (
                                                    <Card name={comida.name} image={comida.img} price={comida.price} />
                                                )
                                            })
                                        }
                                    </div>
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