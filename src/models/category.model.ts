import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    categoryName:{
        type:String,
        required:[true,'Title is required']
    },
    description:{
        type:String,
        required:[true,'description is required']
    },
},{
    timestamps:true
})

const Category = mongoose.model('category',CategorySchema)
export {Category}