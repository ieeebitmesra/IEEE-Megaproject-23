import "./Footer.css";
import { Link , Navigate ,useNavigate} from "react-router-dom";

function Footer(){
    return(
        <div>
            
    <footer>
    <div class="footerContainer">
        <div class="socialIcon">
            <Link to="/Ourteam"><i class="fa-brands fa-facebook"></i></Link>
            <Link to="/Ourteam"><i class="fa-brands fa-instagram"></i></Link>
            <a href="https://github.com/CodeSmith18/BIT-KART"><i class="fa-brands fa-github"></i></a>
            <Link to="/Ourteam"><i class="fa-brands fa-google-plus"></i></Link>
            <Link to="/Ourteam"><i class="fa-brands fa-linkedin"></i></Link>
        </div>
        <div class="footerNav">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="">About Us</Link></li>
                <li><Link to="/Ourteam">Our Team</Link></li>
            </ul>
        </div>
    </div>
    <div class="footerBottom">
        <p>Copyright &copy;2023; Designed by <span class="designer">BITKART TEAM</span></p>
    </div>
    </footer>

        </div>

    );
}

export default Footer;