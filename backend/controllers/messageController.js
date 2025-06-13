import Chat from '../model/Chat.js';
import Message from '../model/Message.js'

export const newMessage = async(req,res)=>{
  try {
    const newMessage = new Message(req.body)
    const savedMessage = await newMessage.save()

    // const currentChat = await Chat.findById(req.body.chatId)
    // currentChat.latestMessage = savedMessage._id;
    const currentChat = await Chat.findByIdAndUpdate({
      _id:req.body.chatId},
      {
        lastMessage:savedMessage._id,
        $inc:{unreadMessageCount:1}
      }
    )
    res.status(201).json({message:'message sent',newMessage})
  } catch (error) {
    res.status(500).json({Message:error})
  }
}

export const getAllMessage = async(req,res)=>{
  try {
    const allMessage = (await Message.find({chatId:req.params.chatId})).sort({createdAt:1})
    res.status(200).json(allMessage)
  } catch (error) {
    res.status(400).json(error)
  }
}