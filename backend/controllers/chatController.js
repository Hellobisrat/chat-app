import Chat from "../model/Chat.js";


export const createNewChat = async(req,res)=>{
  try {
    const chat = new Chat(req.body);
    const savedChat= await chat.save();
    res.status(201).json(savedChat)

  } catch (error) {
    res.status(400).json({message:error})
  }
}

export const getAllChat = async(req,res)=>{
  try {
    const chat = await Chat.find({members:{$in:req.body.userId}});
    res.status(200).json(chat)
  } catch (error) {
    res.status(400).json({message:error})
  }
}