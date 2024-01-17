const express=require("express");
const router=express.Router();
const {register,login,getCurrentUser}=require("../controllers/authController")

router.post('/register',register);

router.post("/login",login);

router.get("/current-user",getCurrentUser);

module.exports=router;