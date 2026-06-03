import mongoose from "mongoose";
import { Schema } from "mongoose";

const user_schema = new Schema({
    username:{
        type:String,
        required:true,
        minlength:3,
    }
    ,email:{
        type:String,
        required:true,
        unique:true,
        minlength:3,
    },
    password:{
        type:String,
        required:true,
    }

})

const User = mongoose.model('User',user_schema)

export default User