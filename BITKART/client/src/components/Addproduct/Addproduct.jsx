import { useEffect, useState } from "react";
import Nav from "../Home/Nav/Nav";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Addproduct.css";




function Addproduct(){
    const  navigate =useNavigate();
    const[ProductName , setProductName]=useState('');
    const[ProductDesc , setProductDesc]=useState('');
    const[ProductPrice , setProductPrice]=useState('');
    const[ProductCategory , setProductCategory]=useState('');
    const[Pimage ,setPimage]=useState('');
    const[Pimage2 ,setPimage2]=useState('');
 

    useEffect(()=>{
        if(!localStorage.getItem("token")){
            Navigate("/login");
        }
    },[]);
  
    const submitHandler=()=>{
 
        const formdata =new FormData();
        formdata.append('ProductName',ProductName);
        formdata.append('ProductDesc',ProductDesc);
        formdata.append('ProductPrice',ProductPrice);
        formdata.append('ProductCategory',ProductCategory);
        formdata.append('Pimage',Pimage);
        formdata.append('Pimage2',Pimage2);
        formdata.append('userId',localStorage.getItem('userId'));
        const url = "http://localhost:4000/Addproduct";
        axios.post(url,formdata)
          .then((res)=>{
            console.log(res);
            alert(res.data.message);
            navigate('/');
          })
          .catch((err)=>{
              console.log(err);
          })
       
    }
    return (
        <div className="parentbox">
           <Nav></Nav>
           <div className="sellbox">
            <div className="productd">
            <h2>Add Your Product here:</h2>
               <div className="pd">
               <label  htmlFor="pname"> Product Name:(required)</label>
                <input type="text"  id="pname" value={ProductName} 
                onChange={(e)=>{setProductName(e.target.value)}} />
                <br />
               </div>
               <div className="pd">
               <label htmlFor="pdesc"> Product desc:(required)</label>
                <input type="text"  id="pdesc" value={ProductDesc} 
                onChange={(e)=>{setProductDesc(e.target.value)}}/>
                <br />
               </div>
               <div className="pd">
               <label htmlFor="pprice"> Product Price:(required)</label>
                <input type="number"  id="price" value={ProductPrice} 
                onChange={(e)=>{setProductPrice(e.target.value)}}/>
                <br />
               </div>
                <div className="pd">
                <label htmlFor="pcategory"> Product Category:(required)</label>
                 <select name="" id="pcategory" value={ProductCategory}
                 onChange={(e)=>{setProductCategory(e.target.value)}}>
                    <option>BiCycle</option>
                    <option>Calculator</option>
                    <option>Clothing</option>
                    <option>Lab Coat</option>
                    <option>EG Kit</option>
                    <option >Study Table</option>
                    <option >Stationary</option>
                    <option >Footwear</option>
                    <option>Electronics</option>
                    <option>Sports</option>
                </select>
                <br />
                </div>
                <div className="pd">
                <label htmlFor="Pimage">Product Image:(required)</label>
                 <input type="file" className="Pimage" 
                 onChange={(e)=> setPimage(e.target.files[0])} />
                 <br/>
                </div>
                <div className="pd">
                <label htmlFor="Pimage2">Product Image:(required)</label>
                 <input type="file" className="Pimage" 
                 onChange={(e)=> setPimage2(e.target.files[0])} />
                 <br/>
                </div>
                <div className="pd">
                <button onClick={submitHandler}> SUBMIT</button>
                </div>
                 
                

           </div>
           
            </div>
                

        </div>
    );
}
export default Addproduct;