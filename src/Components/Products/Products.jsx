import './Products.css'
import { Carousel } from '3d-react-carousal';
import ProducCard from './Produc_card';
import PrettyRating from "pretty-rating-react";
import ScrollToTop from 'react-scroll-to-top';
import { buttonclass } from '../../Style/Clases/Clases';

import plato from '../../Style/images/Landing/Plato.jpg'
import local from '../../Style/images/Landing/Resto.jpg'
import cocina from '../../Style/images/Landing/cocina.jpg'

import plato1 from '../../Style/images/Landing/plato1.jpg'
import plato2 from '../../Style/images/Landing/plato2.jpg'
import plato3 from '../../Style/images/Landing/plato3.jpg'
import plato4 from '../../Style/images/Landing/plato4.jpg'
import plato5 from '../../Style/images/Landing/plato5.jpg'

import cocina1 from '../../Style/images/Landing/cocina1.jpg'
import cocina2 from '../../Style/images/Landing/cocina2.jpg'
import cocina3 from '../../Style/images/Landing/cocina3.jpg'

import resto1 from '../../Style/images/Landing/resto1.jpg'
import resto2 from '../../Style/images/Landing/resto2.jpg'
import resto3 from '../../Style/images/Landing/resto3.jpg'
import resto4 from '../../Style/images/Landing/resto4.jpg'
import resto5 from '../../Style/images/Landing/resto5.jpg'


export default function Products() {

    const colors = {
        star: ['#d9ad26', '#d9ad26', '#434b4d'],
    }

    let imagen = [
        <ProducCard
            item={cocina}
            h1="Nuestra cocina"
            to="carrousel2"
        ></ProducCard>,
        <ProducCard
            item={local}
            h1="Henry's Resto"
            to="carrousel3"
        ></ProducCard>,
        <ProducCard
            item={plato}
            h1="Nuestros platos"
            to="carrousel1"
        ></ProducCard>,

    ]

    let platos = [
        <img src={plato1} alt="plato1"></img>,
        <img src={plato2} alt="plato2"></img>,
        <img src={plato3} alt="plato3"></img>,
        <img src={plato4} alt="plato4"></img>,
        <img src={plato5} alt="plato5"></img>
    ]

    let cocinas = [
        <img src={cocina1} alt="cocina1"></img>,
        <img src={cocina2} alt="cocina2"></img>,
        <img src={cocina3} alt="cocina3"></img>,
    ]

    let restos = [
        <img src={resto1} alt="resto1"></img>,
        <img src={resto2} alt="resto2"></img>,
        <img src={resto3} alt="resto3"></img>,
        <img src={resto4} alt="resto4"></img>,
        <img src={resto5} alt="resto5"></img>,
    ]

    return (
        <div className='contener_max_carrousel'>

            <div className='conteiner_carrousel_main' id='main_carrousel' data-aos="fade-up" data-aos-duration="2500">
                <Carousel slides={imagen} autoplay={false} arrows={false} />
            </div>


            <div className='conteiner_carrousel' id='carrousel1'>
                <div className='contenedor_izquieda_carrousel' data-aos="fade-right" data-aos-duration="1500">
                    <Carousel slides={platos} arrows={false} />
                </div>
                <div className='contenedor_derecha_carrousel'>
                    <h1 data-aos="fade-left" data-aos-duration="1500">Nuestros platos</h1>
                    <div data-aos="fade-up" data-aos-duration="1500">
                        <br />
                        <p>
                            Nos dedicamos al sabor aut??ntico y tradicional de la parrilla argentina, pero tambi??n contamos con platos de autor,
                            completamente exquisitos y creados para satisfacer todos los gustos. Adem??s, encontrar??s los mejores postres que puedas imaginar.
                        </p>
                        <br />
                        <p>
                            Nuestros platos se conciben con un equilibrio entre creatividad, t??cnica e intuici??n. El men?? es variado, con propuestas diversas donde seguramente podr??n encontrar influencias francesas, espa??olas, mediterr??neas en general y, por supuesto, argentinas.
                        </p>
                        <br />
                        <p>
                            Nos gusta utilizar lo que se produce en diferentes regiones de nuestro pa??s, y nos abastecemos a trav??s de peque??os productores o proveedores especializados.
                        </p>
                        <br />
                        <p>
                            ??Qu?? est??s esperando?
                        </p>
                    </div>
                </div>
            </div>
            <div className='conteiner_carrousel' id='carrousel2'>
                <div className='contenedor_izquieda_carrousel' data-aos="fade-left" data-aos-duration="1500">
                    <Carousel slides={cocinas} arrows={false} />
                </div>
                <div className='contenedor_derecha_carrousel' >
                    <h1 data-aos="fade-right" data-aos-duration="1500">Nuestra cocina</h1>
                    <div data-aos="fade-up" data-aos-duration="1500">
                        <br />
                        <p>
                            Cocina, pasteler??a, sal??n, limpieza y administraci??n todos con la  misma consigna, ??Excelencia??. De hecho as?? qued?? bautizado, entre otras propuestas de nuestra gente, un proceso de mejora permanente. Agregarle valor y formaci??n al equipo para que los clientes tengan una gran experiencia en nuestro restaurante.
                        </p>
                        <br />
                        <p>
                            Superarse siempre es un camino, nunca una llegada??? hay que dedicarse y trabajar mucho todos los d??as. Los peque??os detalles esconden las grandes diferencias. Creemos en eso y por ello siempre encontramos algo para hacer mejor, diferente.
                        </p>
                        <br />
                        <p>
                            Agradecemos las cr??ticas y las observaciones igual que las felicitaciones porque todas nos alimentan y nos impulsan. Por eso nos encanta encontrar a nuestros clientes en las redes e interactuar con ellos.
                        </p>
                    </div>
                </div>
            </div>
            <div className='conteiner_carrousel' id='carrousel3' >
                <div className='contenedor_izquieda_carrousel' data-aos="fade-right" data-aos-duration="1500">
                    <Carousel slides={restos} arrows={false} />
                </div>
                <div className='contenedor_derecha_carrousel' >
                    <h1 data-aos="fade-left" data-aos-duration="1500">Henry's Resto</h1>
                    <div data-aos="fade-up" data-aos-duration="1500">
                        <br />
                        <p>
                            Nuestro objetivo es que quedes completamente satisfecho con tu experiencia en Henry's Resto, y por supuesto, ??que te den ganas de volver!
                        </p>
                        <br />
                        <p>
                            Por eso, le damos especial importancia a la atenci??n por parte de nuestros mozos, ofrecemos una gran variedad de opciones de comida para complacer todos los gustos.
                        </p>
                        <br />
                        <p>
                            Tambien podes disfrutar de nuestros productos en la comidad de tu hogar, no dudes en comprar on-line en nuestra web.
                        </p>
                        <br />
                        <p>
                            ??Ven?? a disfrutar!
                        </p>
                    </div>
                </div>
            </div>

            <div>
                <div className='Calificacion_resto_izq' data-aos="fade-right" data-aos-duration="1500">
                    <div className='Calificacion_titulo'>
                        <h1>"Excelente lugar !"</h1>
                        <PrettyRating value={5} colors={colors.star} />
                    </div>
                    <br />
                    <p>Qued?? muy satisfecho con las comidas y la atenci??n fue de la mejor, una experiencia que volver??a a repetir</p>
                </div>
                <div className='Calificacion_resto_der' data-aos="fade-left" data-aos-duration="1500">
                    <div className='Calificacion_titulo'>
                        <h1>"Me encant?? !"</h1>
                        <PrettyRating value={5} colors={colors.star} />
                    </div>
                    <p>La p??gina es muy f??cil de usar, puedo calificar mis pedidos, saber qui??n me lo trae y hasta pagar online facilmente !</p>
                </div>
                <div className='Calificacion_resto_izq' data-aos="fade-right" data-aos-duration="1500">
                    <div className='Calificacion_titulo'>
                        <h1>"Muy satisfactoria experiencia"</h1>
                        <PrettyRating value={5} colors={colors.star} />
                    </div>
                    <br />
                    <p>Realmente me agrada la forma en la que puedo ver todas comidas en la web, cada una con su puntaje y comentarios de los dem??s</p>
                </div>
                <div className='Calificacion_resto_der' data-aos="fade-left" data-aos-duration="1500">
                    <div className='Calificacion_titulo'>
                        <h1>"Mi E-resto favorito"</h1>
                        <PrettyRating value={5} colors={colors.star} />
                    </div>
                    <p>?? Qu?? decir ? Simplemente puedo buscar el producto que quiera, tener mi perfil, modificar mis datos, ver mi historial de pedidos, todo !</p>
                </div>
            </div>

            <ScrollToTop className={buttonclass} id='top_button' smooth={true} viewBox="0 0 24 24" svgPath="M5 15l7-7 7 7" />
        </div>
    )
}