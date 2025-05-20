import '../About_us/About.css'

import linkedin from "../../Style/images/linkedin.png"
import instagram from "../../Style/images/instagram.png"
import github from '../../Style/images/github.png'

export default function About() {
    return (
        <div className="container_about">
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
        </div>
    )
}