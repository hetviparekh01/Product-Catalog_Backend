import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true,'User must have a name']
    },
    email:{
        type:String,
        trim:true,
        unique:true,
        required:[true,'Email is required']
    },
    password:{
        type:String,
        trim:true,
        required:[true,'Password is required']
    },
    role:{
        type:String,
        enum:['Admin','User'],
        required:[true,'Role is required']
    },
    profileImage:{
        type:String,
        required:[true,'Profile Image is required']
    }
},{
    timestamps:true
})
const User = mongoose.model('user',UserSchema)
export {User}