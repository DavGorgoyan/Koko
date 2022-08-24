import { Router } from "express";
import newsRouter from "./news.js"
import productRouter from "./product.js"
import chatRouter from "./chat.js"
const router = Router();

router.use("/news", newsRouter);
router.use("/product", productRouter);
router.use("/chat", chatRouter);





export default router;