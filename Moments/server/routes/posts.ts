import express, { Router } from "express";

import { getPostsBySearch, getPosts, createPost, updatePost, deletePost, likePost, getPost, commentPost } from '../controllers/posts'
import auth from '../middleware/auth'

const router: Router = express.Router()

router.get("/search", getPostsBySearch);
router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", auth, createPost);
router.patch('/:id', auth, updatePost)
router.delete("/:id", auth, deletePost)
router.patch('/:id/likePost', auth, likePost)
router.post('/:id/commentPost', auth, commentPost)

export default router;

// export default (): express.Router => {
//     router.get('/', (req, res) => {
//         res.send('this works')
//     })
//     return router

// }