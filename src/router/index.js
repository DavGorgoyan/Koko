import { Router } from "express";
// import auth from "../middlewares/auth.js";
import authRouter from "./auth.js"


const router = Router();

router.use('/auth', authRouter);




export default router;