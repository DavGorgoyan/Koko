import { Router } from "express";
import {
    buyProductController,
    getLastFiveProductsController,
    getPaginatedProductController,
    getCurrentProductController
} from "../../controllers/user/products.js";
const router = Router();
import multer from "../../middlewares/multer/multer.js";
import validator from "../../middlewares/validator/index.js";


router.post("/:id", buyProductController);
router.get("", getLastFiveProductsController)
router.get("/paginated", getPaginatedProductController);
router.get("/currentProduct/:id", getCurrentProductController);

export default router;