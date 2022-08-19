import { Router } from "express";
import {
    getGreatestRateBlogsController,
    getLastTenBlogsController,
    getPaginatedBlogsController,
    getCurrentBlogControlller,
    getCommentsToBlogController,
    addCommentController,
    rateBlogController,
    deleteCommentController,
    updateCommentsController
} from "../../controllers/user/common_blogs.js";
const router = Router();

router.get("/greatestRate", getGreatestRateBlogsController);
router.get("/lastTenBlogs", getLastTenBlogsController);
router.get("/getBlogsPaginated", getPaginatedBlogsController);
router.get("/currentBlog/:id", getCurrentBlogControlller);
router.get("/comments/:id", getCommentsToBlogController);
router.post("/comment", addCommentController);
router.delete("/comment", deleteCommentController)
router.put("/comment/:id", updateCommentsController)
router.post("/rateBlog", rateBlogController);


export default router;