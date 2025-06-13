import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  members:     { type: [
    {type:mongoose.Schema.Types.ObjectId,ref:"User"}
  ]},

  latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
  unreadMessageCount:{
    type:Number,
    default:0
  }
}, { timestamps: true });

const Chat= mongoose.model("Chat", chatSchema);

export default Chat;