import { Router } from "express";
import { getproductController,
         addproductController,
         updateproductController,
         deleteproductController } from "../../controllers/admin/product.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
const router = Router();
import multer from "../../middlewares/multer/multer.js";
import validator from "../../middlewares/validator/index.js"


router.get("", getproductController);
router.post("", multer.single("image"), validator(`add_product`), addproductController);
router.put("", multer.single("image"), validator("update_product"), updateproductController);
router.delete("", deleteproductController)



export default router;