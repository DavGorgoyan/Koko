import { Router } from "express";
import personalPageRouter from "./personalPage.js"

const router = Router();


router.use("/personalPage", personalPageRouter);




export default router;