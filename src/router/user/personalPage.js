import { Router } from "express";
import {
    getBlogContoller,
    addBlogController,
    updateBlogController,
    deleteBlogController,
    getPurchasesController
} from "../../controllers/user/personalPage.js";
const router = Router();
import multer from "../../middlewares/multer/multer.js";
import validator from "../../middlewares/validator/index.js";

router.get("/blog", getBlogContoller);
router.post("/blog", multer.single("image"), validator("add_blog"), addBlogController);
router.put("/blog/:id", multer.single("image"), validator("update_blog"), updateBlogController);
router.delete("/blog/:id", deleteBlogController);
router.get("/purchases", getPurchasesController);

export default router;