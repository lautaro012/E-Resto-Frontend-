import '../About_us/About.css'

import linkedin from "../../Style/images/linkedin.png"
import instagram from "../../Style/images/instagram.png"
import github from '../../Style/images/github.png'

export default function About() {
    return (
        <div className="container_about">
            <div className="cardAbout card0">
                <div className="border_about">
                    <h2>Sergio</h2>
                    <div className="icons_about">
                        <a target="_blank" rel="noreferrer" href='https://ar.linkedin.com/in/sergio-leonel-romero-sanchez-rajoy-fullstack'><img src={linkedin} height="35" width="35" alt="linkedin_logo" ></img></a>
                        <a target="_blank" rel="noreferrer" href="https://www.instagram.com/phyro_sergio/"><img src={instagram} height="35" width="35" alt="instagram_logo"></img></a>
                        <a target="_blank" rel="noreferrer" href="https://github.com/PhyroFire"><img src={github} height="35" width="35" alt="github_logo"></img></a>
                    </div>
                </div>
            </div>
            <div className="cardAbout card1" >
                <div className="border_about">
                    <h2>Lautaro</h2>
                    <div className="icons_about">
                        <a target="_blank" rel="noreferrer" href='https://ar.linkedin.com/in/lautaro-robles-57a5ba242?trk=people-guest_people_search-card'><img src={linkedin} height="35" width="35" alt="linkedin_logo"></img></a>
                        <a target="_blank" rel="noreferrer" href='https://www.instagram.com/lauta.robles'><img src={instagram} height="35" width="35" alt="instagram_logo"></img></a>
                        <a target="_blank" rel="noreferrer" href='https://github.com/lautaro012/'><img src={github} height="35" width="35" alt="github_logo"></img></a>
                    </div>
                </div>
            </div>
            <div className="cardAbout card2" >
                <div className="border_about">
                    <h2>Luciana</h2>
                    <div className="icons_about">
                        <a target="_blank" rel="noreferrer" href='https://www.linkedin.com/in/luciana-bermudez-72a40520b'><img src={linkedin} height="35" width="35" alt="linkedin_logo"></img></a>
                        <a target="_blank" rel="noreferrer" href="https://www.instagram.com/luubermudezz/" ><img src={instagram} height="35" width="35" alt="instagram_logo"></img></a>
                        <a target="_blank" rel="noreferrer" href="https://github.com/lubermudezz" ><img src={github} height="35" width="35" alt="github_logo"></img></a>
                    </div>
                </div>
            </div>
            <div className="cardAbout card3" >
                <div className="border_about">
                    <h2>Pierino</h2>
                    <div className="icons_about">
                        <a target="_blank" rel="noreferrer" href='https://www.linkedin.com/in/pierino-esteban-juncos-9a4804240/'><img src={linkedin} height="35" width="35" alt="linkedin_logo"></img></a>
                        <a target="_blank" rel="noreferrer" href="https://www.instagram.com/pier_carp/" ><img src={instagram} height="35" width="35" alt="instagram_logo"></img></a>
                        <a target="_blank" rel="noreferrer" href="https://github.com/pierino2203" ><img src={github} height="35" width="35" alt="github_logo"></img></a>
                    </div>
                </div>
            </div>
        </div>
    )
}