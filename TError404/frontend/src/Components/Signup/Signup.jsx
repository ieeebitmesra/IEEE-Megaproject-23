import React, { useState } from 'react'
import {Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../Signup/Signup.scss";
import emailjs from 'emailjs-com';



const Signup = () => {
  const navigate=useNavigate();
    const [details,setDetailsIn]=useState({
        email:"",
        pass:"",
        username:""
    })
    const [otp, setOtp] = useState('');
    const [enteredOtp, setEnteredOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);

    const handlesign=(event)=>{
       const val=event.target.value;
       const typ=event.target.name;
       setDetailsIn((prev)=>{
           if(typ==="email"){
            return{
            email:val,
            pass:prev.pass,
            username:prev.username
            }
           }
           else if(typ==="password"){
            return{
            email:prev.email,
            pass:val,
            username:prev.username
            }
           }
           else{
            return{
            email:prev.email,
            pass:prev.pass,
            username:val
            }
           }
           
       })
       
    }

    const validateEmail = () => {
      const emailRegex = /^[A-Za-z0-9._%+-]+@bitmesra\.ac\.in$/;
      return emailRegex.test(details.email);
    };
  
    const handleGenerateOtp = async () => {
      if (!validateEmail()) {
        alert('Please enter a valid email address with @bitmesra.ac.in domain');
        return;
      }
    
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setOtp(generatedOtp);
  
      const emailParams = {
        to_email: details.email,
        subject: 'Verification Code',
        otp: generatedOtp,
      };
  
      emailjs.send('service_l6bnmdz', 'template_hsx68xb', emailParams, 'G3U1ZN5rfD7Subqmr')
        .then((response) => {
          console.log('Email sent:', response);
          setIsOtpSent(true);
        })
        .catch((error) => {
          console.error('Email send failed:', error);
          alert('Failed to send OTP via email');
        });
    };

    const SubmitDetail=async()=>{
        try{

          if (!isOtpSent || enteredOtp !== otp) {
            alert('Invalid OTP. Please enter a valid OTP.');
            return;
          }

          const response=await axios.post('http://localhost:3000/auth/register',{
            email:details.email,
            username:details.username,
            password:details.pass,
          })
          console.log(response);
          console.log("sign up successful",response.data);
          alert("signup successfull");
          navigate('/signin');
        }catch(error){
          if (error.response && error.response.status === 409) {
            console.error('Sign up failed:', error.message);
            alert('SignUp Failed: Username already exists!');
            navigate('/signin');
          }
          else{
          console.error("signup failed:");
          alert("signup failed:something went wrong");
          }
        }
    }
    // console.log(details);
  return (
    <div className='SignupPage'>
    <div className="Signup">
    <form /*onSubmit={SubmitDetail}*/>
    <img className="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" style={{margin:"auto"}}/>
    <h1 className="h3 mb-3 fw-normal">Please Create your account</h1>

    <div className="form-floating">
      <input value={details.email} name='email' type="email" className="form-control" id="floatingInput" placeholder="name@example.com" fdprocessedid="4p1xue" onChange={handlesign}/>
      <label htmlFor="floatingInput" /*style={{color:"black"}}*/>Email address</label>
      <button type="button" onClick={handleGenerateOtp}>
            Generate OTP
          </button>
    </div>
    <div className="form-floating">
      <input value={details.pass}name="password" type="password" className="form-control" id="floatingPassword" placeholder="Password" fdprocessedid="53vih" onChange={handlesign}/>
      <label htmlFor="floatingPassword" /*style={{color:"black"}}*/>Password</label>
    </div>
    <div className="form-floating">
      <input value={details.username} name="text" type="text" className="form-control" id="floatingInput1" placeholder="username" fdprocessedid="53vih" onChange={handlesign}/>
      <label /*htmlFor="floatingPassword"*/ /*style={{color:"black"}}*/>enter username</label>
    </div>
    <div className="form-floating">
      <input value={enteredOtp} name="otp" type="text" className="form-control" id="otp" placeholder="otp" fdprocessedid="53vih" onChange={(e) => setEnteredOtp(e.target.value)}/>
      <label /*htmlFor="floatingPassword"*/ /*style={{color:"black"}}*/>enter otp</label>
    </div>

    {/* <div className="form-check text-start my-3"> */}
      {/* <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
      <label className="form-check-label" htmlFor="flexCheckDefault">
        Remember me
      </label> */}
    {/* </div> */}
    <button className="btn w-100 py-2" type="button" fdprocessedid="4fs02j" onClick={SubmitDetail}>Create account</button>
    <p> Already have an account <Link to={'/signin'}>Sign in</Link></p>
    <p className="mt-5 mb-3 text-body-secondary">© Made By TError 404</p>
  </form>
  </div>
    </div>
  )
}

export default Signup