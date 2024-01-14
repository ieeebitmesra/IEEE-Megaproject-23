import Nav from "./Home/Nav/Nav";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./Login.css";

function Login(){
    const  navigate =useNavigate();
    const [username,setusername] =useState('');
    const [password,setpassword] =useState('');

    const  handleApi = ()=>{
       
        const url ='http://localhost:4000/login';
        const data ={ username, password};
        axios.post(url,data)
        .then((res)=>{
            console.log(res.data);
            if(res.data.message){
                alert(res.data.message);
                if(res.data.token){
                    localStorage.setItem('token',res.data.token);
                    localStorage.setItem('userId',res.data.userId);
                    navigate('/');
                }
              
            }
    
        })
        .catch((err)=>{
            console.log(err);
            alert("server err");
        })
       }
       const singHandler=()=>{
        navigate('/Singup');
       };
       
    return(
        <div className="maincontainer">
            <Nav></Nav>
    
            <div className="login-singup">
                <div className="Login-container">
                    <h1>Login to Your Account</h1>
                   <div className="input">
                   <input type="text" id="username"value={username} onChange={(e)=>{setusername(e.target.value)}}
                   placeholder="Username" className="ii"/>
                   <br />
                  
                   <input type="password" id="password" value={password}  onChange={(e)=>{setpassword(e.target.value)}}
                   placeholder="Enter Your Password" className="ii"/>
                   <br />
                   </div>
                   
                   <button id="login"onClick={handleApi}>Login</button>
                   <br />
                 </div>     
                 <div className="Singup">
                    <h1>New Here?</h1>
                    <button className="singbtn" onClick={singHandler}>Singup</button>
                    <p>Sing up and Start a Journey with us . .</p>
                    
                 
                </div>  
                </div>
                   
           

        </div>
    )
    
}


export default Login;