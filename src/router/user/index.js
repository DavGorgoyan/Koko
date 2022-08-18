import { Router } from "express";
import productRouter from "./products.js"
import personalPageRouter from "./personalPage.js"

const router = Router();


router.use("/personalPage", personalPageRouter);
router.use("/product", productRouter);



export default router;