import { Request, Response } from 'express';
import PostMessage from '../models/postMessage';
import mongoose from 'mongoose';

//https://www.restapitutorial.com/httpstatuscodes.html
export const getPosts = async (req: Request, res: Response): Promise<void> => {
    const { page }: any = req.query

    try {
        const LIMIT = 8
        const startIndex = (Number(page) - 1) * LIMIT //get the starting index of every page
        const total = await PostMessage.countDocuments({})
        const post: any = (await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex));
        res.status(200).json({ data: post, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
};

export const getPost = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const post = await (PostMessage.findById(id))
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

//Query -> /posts?page=1  -> page=1
//Params -> /posts/123    -> id=123

export const getPostsBySearch = async (req: Request, res: Response): Promise<void> => {
    const { searchQuery, tags }: any = req.query
    try {
        const title = new RegExp(searchQuery, 'i'); // Test test TEST -> test
        const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] })

        res.json({ data: posts })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
};

export const createPost = async (req: any, res: Response): Promise<void> => {
    const post = req.body;
    const newPostMessage = new PostMessage(post)
    try {
        await newPostMessage.save()
        res.status(201).json(newPostMessage)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
};

// /post/id
export const updatePost = async (req: Request, res: Response): Promise<any> => {
    const { id: _id } = req.params
    const post = req.body
    if (!mongoose.Types.ObjectId.isValid(_id)) { return res.status(404).send('no post with that id') }

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true })
    res.json(updatedPost)
}

export const deletePost = async (req: Request, res: Response): Promise<any> => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) { return res.status(404).send('no post with that id') }
    await PostMessage.findByIdAndRemove(_id)
    res.json({ message: "Post deleted successfully" })
}

export const likePost = async (req: any, res: Response): Promise<any> => {
    const { id: _id } = req.params;

    if (!req.userId) return res.json({ message: "Unauthenticated" })

    if (!mongoose.Types.ObjectId.isValid(_id)) { return res.status(404).send('no post with that id') }

    const post: any = await PostMessage.findById(_id)

    // console.log("like id: ", post.likes[index])
    // console.log("user id: ", req.userId)
    for (var i = 0; i < post.likes.length; i++) {
        if (post.likes[i] === String(req.userId))
            var index = i;
        else
            index = undefined;
    }
    // const index = post.likes.findIndex((id: any) => { id === String(req.userId) })
    // console.log("index: ", index);
    if (index === undefined) {
        post.likes.push(req.userId)

    } else {
        // post.likes = post.likes.filter((id: any) => { id != String(req.userId) })
        const filteredLikes = [];
        for (let i = 0; i < post.likes.length; i++) {
            const id = post.likes[i];
            if (id !== String(req.userId)) {
                filteredLikes.push(id);
            }
        }
        post.likes = filteredLikes;

    }
    // console.log("post like id: ", post.likes)

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true })

    res.json(updatedPost)
}

export const commentPost = async (req: Request, res: Response) => {
    const { id } = req.params
    const { value }: any = req.body


    const post: any = await PostMessage.findById(id)
    // console.log(value)
    // console.log(post.comments.length)
    // for (let i = 0; i < post.comments.length(); i++)
    //     post.comments[i] = value;
    post.comments.push(value)

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true })

    res.json(updatedPost)
}