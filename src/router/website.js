import { Router } from "express";
import {
    getLastTenNewsController,
    getCurrentNewsController,
    greatestRateBlogsController,
    getCurrentBlogController
} from "../controllers/website/index.js";


const router = Router();

router.get("/lastTenNews", getLastTenNewsController);
router.get("/currentNews/:id", getCurrentNewsController);
router.get("/greatestRateBlogs", greatestRateBlogsController);
router.get("/currentBlog/:id", getCurrentBlogController);

export default router;