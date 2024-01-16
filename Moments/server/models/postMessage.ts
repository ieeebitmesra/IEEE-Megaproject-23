import mongoose, { Schema, Model } from 'mongoose'

interface Post {
    title: string;
    message: string;
    name: string;
    creatorId: string;
    tags: string[];
    selectedFile: string;
    likes: string[];
    comments: string[];
    createdAt?: Date;
}

const postSchema: Schema<Post> = new mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creatorId: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
    comments: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const PostMessage: Model<Post> = mongoose.model<Post>('PostMessage', postSchema)

export default PostMessage