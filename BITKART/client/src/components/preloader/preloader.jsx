import React, { useEffect } from 'react';
import "./preloader.css"
import { preLoaderAnim } from '../animation';
import image from "./images.png"


const Preloader =()=>{

    useEffect(()=>{
        preLoaderAnim();
    },[]);
    return(
        <div className="preloader">
            <div className="text-container11">
                <img src={image} alt="" />
                <h1>BITKART</h1>
                <h2>Empowering campus E-commerce....</h2>
            </div>
        </div>
    )
}
export default  Preloader;