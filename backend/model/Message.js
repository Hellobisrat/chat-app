import mongoose from "mongoose";

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  chatId: {type:mongoose.Schema.Types.ObjectId,ref:'Chat'},
  sender:   { type: mongoose.Schema.Types.ObjectId, ref: "User"},
  text:  { type: String, required: true },
  read: {
    type: Boolean,
    default:false
  }
 

},{timestamps:true})

const Message = mongoose.model('Message',messageSchema);

export default Message;