import pic from "./au.avif";
import "./aboutUs.css";
import Nav from "../Home/Nav/Nav";
import Footer from "../Home/Footer/Footer";
import { Link } from "react-router-dom";

function  AboutUs(){
    return(
        <> 
        <Nav></Nav>
           <div class="wrapper">

<div className="background-container">
    <div className="bg-1"></div>
    <div className="bg-2"></div>
</div>
<div className="about-container">
    <div className="image-container">
        <img src={pic} alt=""></img> 
    </div>

    <div className="text-container">
        <h1>BIT-KART</h1>
        <h4>Empowering Campus Commerce</h4>
        <p>BIT-KART is an innovative web development project aimed at creating a dynamic online platform tailored for the buying and selling of second-hand goods within a college campus. The platform is designed to foster a sense of community, sustainability, and convenience among students, providing them with a seamless and secure way to exchange pre-owned items.</p>
         <Link  id="readmore" to="/Ourteam">Read More</Link>
    </div>
    
</div>
</div>
   <Footer></Footer>
         </>
     
    );

}
export  default AboutUs;