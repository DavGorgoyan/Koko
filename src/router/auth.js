import { Router } from "express";
import {
    registerController,
    loginController,
    forgetpasswordController,
    checkcodeController,
    resetPasswordController
} from "../controllers/auth.js";
import multer from "../middlewares/multer/multer.js";
import validator from "../middlewares/validator/index.js";


const router = Router();

router.post("/register",multer.single("image"),validator(`register`), registerController)
router.post("/login",loginController)
router.post("/forgetpassword",forgetpasswordController);
router.post("/checkcode",checkcodeController)
router.put("/resetpassword", validator("reset_password"), resetPasswordController)

export default router;