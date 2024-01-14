import { Link , Navigate ,useNavigate} from "react-router-dom";
import Home from "../../Home";
import "./Nav.css";
import logo from './logo.png';
import Headroom from 'react-headroom';
import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
 import LikedProduct from "../../LikedProduct/LikedProduct";
 import user from "./user.png"
 import { useState } from "react";


function Nav(props){
   const msg1 ="You are Logged Out";
   
   const [showDropdown, setShowDropdown] = useState(false);

   const toggleDropdown = () => {
     setShowDropdown(!showDropdown);
   };
   let userId=localStorage.getItem('userId');
 
  
  
  const  navigate =useNavigate();
  const handelLogout =()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    
    navigate('/Login');
  }
  const sellHandler = ()=>{
    if(localStorage.getItem('token')){
      navigate("/Addproduct");
    }
    else{
      toast("login first to sell");
      navigate('/Login');
    }
  }
    return(
      
    <Headroom>
      <nav class="NavBar">

   <div class="bar">
    <span><Link to="/"><img src={logo} alt="" /></Link></span>
    <div className="search">

      <input type="text" name="" id="" value={props && props.search} onChange={(e)=> props.handlesearch && props.handlesearch(e.target.value)}/>

      <button className="search-btn" onClick={()=>props.handleClick && props.handleClick()}><i class="fa fa-search " id="sch"></i></button>
    </div>

    <ul class="link">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/aboutus">About Us</Link></li>
        <li><Link to="/Ourteam">Our Team</Link></li>
        <li><button class="sell" on onClick={sellHandler}>Sell Your Product</button></li>
        
        {/* 
        <li><Link to="/like-product">Liked Product</Link></li>
        <li><Link to="/UserProfile">UserProfile</Link></li> */}
    </ul>
    {!userId &&<button class="login"><Link to="/Login">Login/Singup</Link></button>}
    <div className="user-container" onClick={toggleDropdown}>
        
        <img src={user} alt="User" className="user-image1" />
    </div>
</div>


</nav> 
{showDropdown && (
        <div className="dropdown1">
          <ul>
            <li><Link to="/like-product">Favourites</Link></li>
            <li><Link to="/my-products">Your Products</Link></li>
            <li><Link to="/UserProfile">UserProfile</Link></li>
            <li> <button onClick={handelLogout}>LogOut</button></li>
            <li><Link to="/aboutus">About Us</Link></li>
            <li><Link to="/Ourteam">Our Team</Link></li>
            <li><button class="sell" on onClick={sellHandler}>Sell Your Product</button></li>
           <li> {!userId &&<button class="login"><Link to="/Login">Login/Singup</Link></button>}</li>
           
          </ul>
        </div>
      )}
</Headroom>
      
);
}
export default Nav;

{/* <div className="header"> */}
          
          

          
          //   <button onClick={sellHandler}>Sell Your Product</button>
          // {!localStorage.getItem('token')?
          //   <Link to="/Login">Login</Link>:
          //  <button onClick={handelLogout}>LogOut</button> }


         
        // </div> */