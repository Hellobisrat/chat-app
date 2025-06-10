import express from "express";
import { createChat, fetchChats } from "../controllers/chatController.js";
const router = express.Router();

router.post("/", createChat);
router.get("/", fetchChats);

export default router;