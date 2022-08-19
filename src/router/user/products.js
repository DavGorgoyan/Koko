import { Router } from "express";
import {
    buyProductController,
    getLastFiveProductsController,
    getProductController,
    getCurrentProductController
} from "../../controllers/user/products.js";
const router = Router();


router.post("/buy/:id", buyProductController);
router.get("/lastFiveProducts", getLastFiveProductsController)
router.get("/paginated", getProductController);
router.get("/currentProduct/:id", getCurrentProductController);

export default router;