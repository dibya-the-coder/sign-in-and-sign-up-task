import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "This field is required"],
    },
    email:{
        type:String,
        required:[true, "Email can not be empty"],
        unique:[true, "This email is already exists"]
    },
    password:{
        type:String,
        required:[true, "Password can not be empty"]
    },   
 })

const user = mongoose.models.User || mongoose.model('User',userSchema );
export default user
 