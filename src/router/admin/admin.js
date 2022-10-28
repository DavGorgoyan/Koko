import { Router } from "express";
import newsRouter from "./news.js"
import productRouter from "./product.js"
import chatRouter from "./chat.js"
import { getTransactionsController } from "../../controllers/admin/transactions.js"
const router = Router();

router.use("/news", newsRouter);
router.use("/product", productRouter);
router.use("/chat", chatRouter);
router.get("/trans", getTransactionsController);






export default router;