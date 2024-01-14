import "./Ourteam.css";
import ritik  from "./ritik.jpg";
import saket from "./saket.jpg";
import Nav from "../Home/Nav/Nav";
import Footer from "../Home/Footer/Footer";
import nikhil from  "./nikhil.jpg";


function Ourteam(){
    return(
        <div class="main">
              <Nav></Nav>
        <div className="teampage">
            <p>"Together, we make the extraordinary happen. Each one of you brings unique talents and perspectives,
                creating a powerful synergy that propels us forward."</p>
            <h1 class="team">Meet Our Team...</h1>

        </div>
        <div className="home-container">

            <div className="profile-card">
                <div className="img">
                    <img src={ritik}></img>
                </div>
                <div className="caption">
                    <h3>Ritik Raj</h3>
                    <p>ECE</p>
                    <div className="social-links">
                        <li className="ll"><a href="https://www.linkedin.com/in/ritik-raj1875/">LinkedIn</a></li>
                        <li className="git"><a href="https://github.com/CodeSmith18">GitHub</a></li>
                        <li className="insta"><a href="https://www.instagram.com/ritikraj_1875/">Instagram</a></li>
                    </div>
                </div>
            </div>
            <div className="profile-card">
                <div className="img">
                    <img src={saket}></img>
                </div>
                <div className="caption">
                    <h3>Saket Nayan</h3>
                    <p>AIML</p>
                    <div className="social-links">
                        <li className="ll"><a href="https://www.linkedin.com/in/saket-nayan-3b0b6b250/">LinkedIn</a></li>
                        <li className="git"><a href="https://github.com/s-nayan">GitHub</a></li>
                        <li className="insta"><a href="https://www.instagram.com/saket_nyn/">Instagram</a></li>
                    </div>
                </div>
            </div>
            <div className="profile-card">
                <div className="img">
                    <img src={nikhil}></img>
                </div>
                <div className="caption">
                    <h3>Nikhil Singh</h3>
                    <p>ECE</p>
                    <div className="social-links">
                        <li className="ll"><a href="#no">LinkedIn</a></li>
                        <li className="git"><a href="#no">GitHub</a></li>
                        <li className="insta"><a
                                href="https://www.instagram.com/nikhilsingh_rajput_18?igsh=OGQ5ZDc2ODk2ZA==">Instagram</a>
                        </li>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
    );

}

export default Ourteam;