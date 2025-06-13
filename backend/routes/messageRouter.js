import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import { newMessage,getAllMessage } from '../controllers/messageController';


const messageRouter = express.Router();

messageRouter.post('/newMessage',authMiddleware,newMessage)
messageRouter.get('/getAllMessage/:chatId',authMiddleware,getAllMessage)





export default messageRouter;