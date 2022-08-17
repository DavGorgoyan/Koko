import { Router } from "express";
import newsRouter from "./news.js"
import productRouter from "./product.js"
const router = Router();

router.use("/news", newsRouter);
router.use("/product",productRouter);






export default router;