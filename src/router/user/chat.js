import { Router } from "express";
import {
    getChatMessagesController
} from "../../controllers/user/chat.js";
const router = Router();

router.get("/chatMessages", getChatMessagesController)

export default router;