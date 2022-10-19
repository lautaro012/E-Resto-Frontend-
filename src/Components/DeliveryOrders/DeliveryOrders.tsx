


export default function DeliveryOrders ({detalles}:any) {

    return (
        <div className="Delivery-orders-conteiner">
            {
                detalles?.map((items:any) => {
                    if(items.delivered) {
                        return (
                            <div className="orderlist_price_conteiner">
                            <h1 className="h1-conteiner"> Detalles del pedido </h1>
                            <br></br>
                            <table className="orderlist_price_conteiner">
                              {items?.items.map((item: any) => {
                                return (
                                  <div key={item.name}>
                                    <tr className="orderlist_item_conteiner">
                                      <td><img width={60} src={item.img} alt="alt"></img></td>
                                      <td>{item.cantidad}</td>
                                      <td>{item.name}</td>
                                      <td><p> $ {item.price} </p></td>
                                    </tr>
                                    <br></br>
                                  </div>
                                );
      
                              })}
                            </table>
                            <br />
                            <div className="orderlist_price_conteiner2">
                              <div className="orderlist_details_conteiner">
                                <span>
                                  <h2>Subtotal </h2>
                                  <h2>${items.subtotal}</h2>
                                </span>
                                <span>
                                  <h2>Propina </h2>
                                  <h2>${items.propina}</h2>
                                </span>
                                <span>
                                  <h2>
                                    <strong>Total </strong>
                                  </h2>
                                  <h2>${items.total}</h2>
                                </span>
                                <span>
                                  {
                                    items.paid ?
                                      <h2><strong>pagado</strong></h2>
                                      :
                                      null
                                  }
                                </span>    
                              </div>
                              {
                                items.user.length ?
                                  <div className="orderlist_details_conteiner">
                                    <span>
                                      <h1>
                                        <strong>Para:</strong> {items.user[0].name}{" "}
                                        {items.user[0].lastName}
                                      </h1>
                                    </span>
                                    <span>
                                      <h1>
                                        <strong>Direccion:</strong> {items.user[0].adress}
                                      </h1>
                                    </span>
                                    <span>
                                      <h1>
                                        <strong>Horario:</strong> {items.date.slice(11, -5)}
                                      </h1>
                                    </span>
                                  </div>                                                 
                                  :
                                  null
                              }                    
                            </div>
                            <br />
                          </div>
                        )
                    }
                    return null
                })
            }
        </div>
    )
}