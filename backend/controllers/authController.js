import { use } from "react";
import User from "../models/User.js";
import dotenv from 'dotenv'
import bcrypt from "bcryptjs";
import JWT from 'jsonwebtoken'

dotenv.config();

// export const createChat = async (req, res) => {
//   const { participants, chatName } = req.body;
//   try {
//     const newChat = await Chat.create({ participants, chatName });
//     res.status(201).json(newChat);
//   } catch (err) {
//     res.status(500).json({ message: "Chat creation failed", error: err.message });
//   }
// };

// export const fetchChats = async (req, res) => {
//   try {
//     const chats = await Chat.find({ participants: req.user._id }).populate("participants", "-password");
//     res.status(200).json(chats);
//   } catch (err) {
//     res.status(500).json({ message: "Could not fetch chats", error: err.message });
//   }
// };


export const signUp = async (req,res)=>{
  const {firstName,lastName,email,password}= req.body;
  try {
    const user = await User.findOne({email})
    if(user){
      return res.status(400).json('user already registered')
    }
    const hashedPassword = await bcrypt.hash(password,10)

    const newUser =  new User({
      firstName,
      lastName,
      email,
      password:hashedPassword
    })

    await newUser.save();
    const {password,...userWithOutPassword} = newUser

    res.status(200).json({message:'successfully signed up',userWithOutPassword})
    
  } catch (error) { res.send(500).json({message:'signup failed'})
   
  }
}

export const login = async (req,res)=>{
  const {email,password}= req.body
  try {
    const user = await User.findOne({email})
    if(!user){
      return res.status(400).json({message:"no user with given email"})
    }
    const comparedPassword = await bcrypt.compare(password,user.password)
    if(!comparedPassword){
      return res.status(400).json({message:"wrong password"})
    }
    const { password: _, ...safeUser } = user._doc;
    const token = JWT.sign({userId:user._id},process.env.SECRET,{expiresIn:'1d'})

    res.status(200).json({message:'successfully Logged in',user:safeUser,token})
    
  } catch (error) {
    res.status(500).json({message:'login failed'})
  }
}