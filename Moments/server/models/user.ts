import mongoose, { Schema, Model } from 'mongoose'

const userSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    id: {
        type: String,
    },
})

export default mongoose.model("User", userSchema)