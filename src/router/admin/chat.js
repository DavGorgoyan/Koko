import { Router } from "express";
import {
    getConversatoinsController,
    getChatMessagesController
} from "../../controllers/admin/chat.js";
import { auth } from "../../middlewares/socketMiddlewares.js"



const router = Router();

router.get("/conversations", getConversatoinsController);
router.get("/chatMessages", getChatMessagesController)


export default router;