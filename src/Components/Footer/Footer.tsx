import './Footer.css'
import Subscribe from '../SubscribeButton/Subscribe'

export function Footer () {


    return (
      
            <div>
              <footer className="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
                <span id='colorFooterConfig' className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="/pedidos" className="hover:underline">Henry's Resto Project™</a>. Todos los derechos reservados.
                </span>
                <ul id='colorFooterUlConfig' className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6 ">Sobre Nosotros</a>
                    </li>
                    <li>
                        <a href="/pedidos" className="mr-4 hover:underline md:mr-6">Hacé tu pedido</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline">Contacto</a>
                    </li>

                </ul>
                <span>
                    <Subscribe/>
                </span>
            </footer>
            </div>
    )
}