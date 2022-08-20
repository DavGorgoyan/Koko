import { Router } from "express";
import newsRouter from "./news.js"
import productRouter from "./product.js"
import transactionRouter from "./transactions.js"
const router = Router();

router.use("/news", newsRouter);
router.use("/product", productRouter);
router.use("/trans", transactionRouter);






export default router;