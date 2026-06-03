import { Schema } from "mongoose";
import mongoose from "mongoose";

const blog_schema = new Schema({
    
    title:{
        type:String,
        required:true,
        unique:true,
    },
    content:{
         type:String,
    },
    author:{
        type:String,

    },

}, { timestamps: true })

const blog =  mongoose.model('blog',blog_schema)
export default blog 