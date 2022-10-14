export default function DetailOrder({ order }: any) {

    return (
        <div>
            {
                order && order.items.map((food: any) => {
                    return (
                        <div id="conteinerCart_order" key={food.name}>
                            <p>{food.name}</p>
                            <p>${food.price}</p>
                            <img src={food.img} alt={food.name}></img>
                            <p>{food.cantidad}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}
