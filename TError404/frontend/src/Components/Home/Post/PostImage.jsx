import React from 'react'
import {Buffer} from "buffer";

const PostImage = ({image,altText}) => {
  
    if(!image || !image.data || !image.contentType){
        return null;
    }
    
    const bufferData=Buffer.isBuffer(image.data) ? image.data : Buffer.from(image.data,'base64');

    const base64String=bufferData.toString('base64');
    const src=`data:${image.contentType};base64,${base64String}`;

    return <img src={src} alt={altText} style={{maxWidth:'100%',height:'auto'}}/>
};

export default PostImage