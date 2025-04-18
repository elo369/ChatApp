import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controllers.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/send/:receiverId", isAuthenticated, sendMessage);
router.get("/messages/:otherParticipantId", isAuthenticated, getMessages);

export default router;