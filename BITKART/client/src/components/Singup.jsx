import Nav from "./Home/Nav/Nav";
import { useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Singup.css";

function  SingUp(){
    const  navigate =useNavigate();
    const [email,setemail] =useState('');
    const [username,setusername] =useState('');
   const [password,setpassword] =useState('');
   const [phno,setphnumber] =useState('');
   const [hno,sethostelno] =useState('');

   const  handleApi = ()=>{
    console.log({
        username,
        password,
        email,
        phno,
        hno
    });
    const url ='http://localhost:4000/singup';
    const data ={ username, password, email,  phno, hno };
    axios.post(url,data)
    .then((res)=>{
        console.log(res.data);
        if(res.data.message){
            alert(res.data.message);
            navigate("/Login");
        }

    })
    .catch((err)=>{
        console.log(err);
        alert("server err");
    })
   }
   const loginhandler=()=>{
    navigate('/Login');
   };
   

    return(
        <div className="mbox">
            <Nav></Nav>

            <div className="Container">
                <div className="singup">
                  <h1> Create Your Account</h1>
                  <div className="input">
                  <input type="email" id="email" value={email} onChange={(e)=>{setemail(e.target.value)}} placeholder="Enter Your E-Mail"/>
                  <br/>

                  <input type="text" value={username} onChange={(e)=>{setusername(e.target.value)}}id="username"placeholder="Username"/>
                  <br />
                  
                  <input type="password" id="password" value={password} onChange={(e)=>{setpassword(e.target.value)}}placeholder="Enter Your Password"/>
                  <br />
                  
                  <input type="text" id="phnumber"value={phno} onChange={(e)=>{setphnumber(e.target.value)}} placeholder="Enter Your Ph.No."/>
                  <br />
                  
                  <input type="number" id="hostel-no"  min="1" max="13"value={hno} onChange={(e)=>{sethostelno(e.target.value)}}placeholder="HostelNo."/>
                  <br />

                  </div>
                  
                  <button  onClick={handleApi} id="singup">SingUp</button>
                  <br />
                </div>
                <div className="loginn">
                    <div className="heading"><h1>Already have a account ?</h1></div>
                    <div className="tt"> <h2>Click to Login</h2></div>
                    <button onClick={loginhandler}>Login</button>
                   
                </div>
                
            </div>
          
        </div>
    );
}
export default SingUp;