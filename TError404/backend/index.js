const express=require("express");
const fileUpload=require("express-fileupload");
const dotenv=require("dotenv");
const cors=require("cors");
const mongoose=require("mongoose");
const jwt=require('jsonwebtoken');
const authRoutes=require('./routes/auth');
const protectedRoutes=require('./routes/protected');

dotenv.config();
const app=express();
const port=process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.use('/auth',authRoutes);
app.use('/protected',protectedRoutes);


mongoose
.connect('mongodb+srv://ieee-mega:ieee-mega@cloudcluster.tq8fbbp.mongodb.net/test?retryWrites=true&w=majority')
.then(()=>{
    console.log('Connection to database established');
})
.catch((err)=>{
    console.error('Error connecting to database:',err.message);
});

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});
