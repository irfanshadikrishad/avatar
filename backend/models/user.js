import { Schema, model } from "mongoose";

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    }
})

const User = model('User', userSchema);

export default User;