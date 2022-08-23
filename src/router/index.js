import { Router } from "express";
import authRouter from "./auth.js";
import adminRouter from "./admin/admin.js";
import websiteRouter from "./website.js";
import userRouter from "./user/index.js";
import authMiddleware from "../middlewares/authMiddleware.js";


const router = Router();

router.use('/auth', authRouter);
router.use("/admin", authMiddleware('admin'), adminRouter);
router.use("/website", websiteRouter);
router.use("/user", authMiddleware("users"),  userRouter);


export default router;
