import React, { useContext, useState } from 'react'
import "../Mobile-Display/MobNav.scss"
import { IoHome } from "react-icons/io5";
import { PiFinnTheHumanFill } from "react-icons/pi";
import { BsAt } from "react-icons/bs";
import { BsCursorFill } from "react-icons/bs";
import { SiteContext } from '../../Context/siteContext';
const MobNav = () => {
  const {nav,setnav}=useContext(SiteContext);
    // const [nav,setnav]=useState("Home");

    const setHome=()=>{
        setnav("Home");
    }
    const setPos=()=>{
        setnav("Post");
    }
    const PostCreate=()=>{
        setnav("PostCreate");
    }
    const setProfile=()=>{
        setnav("profile");
    }
  return (
    // <div>
   <div className='n'>
     <div className='icon' onClick={setHome} style={{backgroundColor:nav=="Home"?"#212121":null}}><IoHome size={40}/></div>
     <div className='icon' onClick={setPos} style={{backgroundColor:nav=="Post"?"#212121":null}}><PiFinnTheHumanFill size={40}/></div>
     <div className='icon' onClick={PostCreate} style={{backgroundColor:nav=="PostCreate"?"#212121":null}}><BsAt size={40}/></div>
     <div className='icon' onClick={setProfile} style={{backgroundColor:nav=="UserPost"?"#212121":null}}><BsCursorFill size={40}/></div>
   </div>
//    </div>
  )
}

export default MobNav