import { Router } from "express";
import {
    registerController,
} from "../controllers/auth.js";
import multer from "../middlewares/multer/multer.js";
import validator from "../middlewares/validator/index.js";


const router = Router();

router.post("/register",multer.single("image"),validator(`register`), registerController)




export default router;