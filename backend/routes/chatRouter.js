import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import { createNewChat,getAllChat } from '../controllers/chatController';

const chatRouter = express.Router();


chatRouter.post('/createNewChat',authMiddleware,createNewChat)
chatRouter.get('/getAllChat',authMiddleware,getAllChat)


export default chatRouter;