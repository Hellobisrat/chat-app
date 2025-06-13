import mongoose from "mongoose";

const Schema = mongoose.Schema

const userSchema = new Schema({
  firstName: {
    type:String,
    required:true},
  lastName:{
    type:String,
    required:true
  },
  
  email:    { type: String, required: true },

  password: { 
    type: String, 
    required: true,
    select:false
   },
  profilePic: {
    type:String,
    require:false,
    minlength:8
  }
   }, 
 

  
  { timestamps: true })

const User = mongoose.model("User",userSchema)

export default User;