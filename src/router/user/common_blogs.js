import { Router } from "express";
import {
    getGreatestRateBlogsController,
    getLastTenBlogsController,
    getPaginatedBlogsController,
    getCurrentBlogControlller,
    getCommentsToBlogController,
    addCommentController,
    likeBlogController,
    dislikeBlogController,
    deleteCommentController
} from "../../controllers/user/common_blogs.js";
const router = Router();

router.get("/greatestRate", getGreatestRateBlogsController);
router.get("/lastTenBlogs", getLastTenBlogsController);
router.get("/getBlogsPaginated", getPaginatedBlogsController);
router.get("/currentBlog/:id", getCurrentBlogControlller);
router.get("/comments/:id", getCommentsToBlogController);
router.post("", addCommentController);
router.delete("", deleteCommentController)
router.post("/likeBlog", likeBlogController);
router.post("/dislikeBlog", dislikeBlogController);


export default router;