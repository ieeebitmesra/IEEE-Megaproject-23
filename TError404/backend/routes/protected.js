const express=require("express");
const router=express.Router();
const postController=require("../controllers/postController")

router.route("/posts")
.get(postController.getPosts)
.post(postController.createPost)

router.route("/posts/:postId")
.get(postController.getPostById)
.delete(postController.deletePost)
.put(postController.editPost); 

router.route("/posts/user/:username")
.get(postController.getPostsByUser);

module.exports=router;