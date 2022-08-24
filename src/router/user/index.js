import { Router } from "express";
import productRouter from "./products.js"
import personalPageRouter from "./personalPage.js"
import commonBlogsRouter from "./common_blogs.js"
import chatRouter from "./chat.js"

const router = Router();


router.use("/personalPage", personalPageRouter);
router.use("/product", productRouter);
router.use("/blogs", commonBlogsRouter);
router.use("/chat", chatRouter)



export default router;