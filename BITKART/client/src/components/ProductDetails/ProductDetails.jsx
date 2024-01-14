import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../Home/Nav/Nav";
import "./ProductDetails.css";
import  whatsapp from "./whatsapp.png"
import Footer from "../Home/Footer/Footer";
function ProductDetail() {
    const p = useParams();
    console.log(p.productId);
    const [product, setproduct] = useState();
    const [user, setUser] = useState();
    console.log(user);

    useEffect(() => {
        const url = 'http://localhost:4000/getProduct/' + p.productId;
        axios.get(url)
            .then((res) => {
                if (res.data.products) {
                    setproduct(res.data.products);
                    console.log(res);
                }

            })
            .catch((err) => {
                console.log(err);
                alert('server err');
            })

    }, []);
    const HandleContact = (addedBy) => {
        const url = 'http://localhost:4000/getUser/' + addedBy;
        axios.get(url)
            .then((res) => {
                if (res.data.user) {
                    setUser(res.data.user);
                }



            })
            .catch((err) => {
                console.log(err);
                alert('server err');
            })


    }
    let uu = user && user.phno ? `https://wa.me/+91${user.phno}` : '';


    return (<div className="motherr">
        <Nav></Nav>
        <div className="page-conatiner">
            <div className="product-detail-container">
            <h2>PRODUCT DETAILS:</h2>
                    {product &&<div className="product-details">
                       <div className="product-images">
                            <img src={"http://localhost:4000/" + product.Pimage} alt="" />
                            {product.Pimage2 && <img src={"http://localhost:4000/" + product.Pimage2} alt="" />}
                            
                        </div>
                       <div className="pdd">
                      <div className="product-info">
                           <h2> Product Name:{product.ProductName}</h2> 
                           <h2> Product Price: Rs{product.ProductPrice} </h2>
                           <h2>Prodcut Description: <p> {product.ProductDesc}</p></h2>
                           
                        </div>
                        <div className="contact-details">
                            {product.addedBy && <button className="pd1" onClick={() => HandleContact(product.addedBy)}>Show Contact Details:</button>}
                            {user && user.username && <h2>Username:{user.username}</h2>}
                            {user && user.phno && <h2>Phone Number:{user.phno}</h2>}
                            {user && user.phno && <h2><a href={uu} target="_blank"><img src={whatsapp} alt="" /></a ></h2>}
                            {user && user.username && <h2>Email:{user.email}</h2>}
                            {user && user.hno && <h2>Hostel Number:{user.hno}</h2>}
                            {user && user.roll && <h2>Roll:{user.roll}</h2>}
                            {user && user.year && <h2>Year:{user.year}</h2>}
                            {user && user.branch && <h2>Branch:{user.branch}</h2>}
                            
                              
                        </div>
                       
                       </div>
                    </div>}


              
            </div>
        </div>
        <Footer></Footer>
    </div>
    );
}
export default ProductDetail;