import Chat from "../models/Chat.js";

export const createChat = async (req, res) => {
  const { participants, chatName } = req.body;
  try {
    const newChat = await Chat.create({ participants, chatName });
    res.status(201).json(newChat);
  } catch (err) {
    res.status(500).json({ message: "Chat creation failed", error: err.message });
  }
};

export const fetchChats = async (req, res) => {
  try {
    const chats = await Chat.find({ participants: req.user._id }).populate("participants", "-password");
    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch chats", error: err.message });
  }
};