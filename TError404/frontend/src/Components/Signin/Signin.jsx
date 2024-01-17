import React,{useState} from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "../Signin/Signin.scss"

const Signin = () => {
  const navigate=useNavigate();
  const [signInDetails,setSignInDetails]=useState({
    username:"",
    pass:""
  })

  
const handleSignIn=(event)=>{
  const {name,value}=event.target;

  setSignInDetails((prev)=>{
      if(name==="username"){
          return{
                username:value,
                pass:prev.pass
            }
        }
        else{
            return{
                username:prev.username,
                pass:value
            }
        }
    })

  }
  console.log(signInDetails);


  const UserLogin=async()=>{
    try{
      const response=await axios.post('http://localhost:3000/auth/login',{
       username:signInDetails.username,
       password:signInDetails.pass,
      });

      localStorage.setItem('token',response.data.token);
      console.log("sign in successful:",response.data);
      alert("signin successfull");
      navigate('/Home');
    }catch(error){
     console.error("signin failed",error.message)
     alert("signin failed: user does not exist")
    }
 }

  return (
    <div className='SigninPage'>
    <div className="Signin">
    <form>
    <img className="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" style={{margin:"auto"}}/>
    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

    <div className="form-floating">
      <input name="username" type="username" className="form-control" id="floatingInput" placeholder="Username" fdprocessedid="4p1xue" onChange={handleSignIn}/>
      <label htmlFor="floatingInput" /*style={{color:"black"}}*/>Username</label>
    </div>
    <div className="form-floating">
      <input name="password" type="password" className="form-control" id="floatingPassword" placeholder="Password" fdprocessedid="53vih" onChange={handleSignIn}/>
      <label htmlFor="floatingPassword" /*style={{color:"black"}}*/>Password</label>
    </div>
    

    <div className="form-check text-start my-3">
      <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
      <label className="form-check-label" htmlFor="flexCheckDefault">
        Remember me
      </label>
    </div>
    <button className="btn w-100 py-2" type="button" fdprocessedid="4fs02j" onClick={UserLogin}>Sign in</button>
    <p> New to website <a href='/signup'>Sign up</a></p>
    <p className="mt-5 mb-3 text-body-secondary">© Made By TError 404</p>
  </form>
  </div>
    </div>
  )
}

export default Signin;