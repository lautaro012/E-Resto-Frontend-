import { useAppDispatch } from '../../../config'
import { deleteProduct } from '../../../redux/actions'
import {listUsuariosRegistrados, mailUsuarioRegistrado, nameUsuarioRegistrado, buttonclass} from '../../../Style/Clases/Clases'
export default function Cartita ({e, onProducEdit, deleted}:any) {
    const handleEdit = () => {
        onProducEdit(e)
    }
    const handleDelete= () => {
        deleted(e._id)
    }
    return (
        <div className="flow-root">
                                    <ul role="list" className={listUsuariosRegistrados}>
                                        <li className="py-3 sm:py-4">
                                            <div className="flex items-center space-x-4">
                                                <div className="flex-shrink-0">
                                                    <img className="w-8 h-8 rounded-full" src={e.img} alt="Product img"/>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className={nameUsuarioRegistrado}>
                                                        {e.name}
                                                    </p>
                                                    <p className={mailUsuarioRegistrado}>
                                                        {e.decription}
                                                    </p>
                                                </div>
                                                <div>
                                                <button className={buttonclass} onClick={handleEdit}>
                                                    Editar Producto
                                                </button>
                                                    <button onClick={handleDelete} className={buttonclass}>Eliminar Producto</button>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                            </div>
    )
}