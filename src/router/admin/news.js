import { Router } from "express";
import { addnewsController,
         sendnewsController,
         updatenewsController,
         deletenewsController } from "../../controllers/admin/news.js";
const router = Router();
import multer from "../../middlewares/multer/multer.js";
import validator from "../../middlewares/validator/index.js"

router.post("", multer.single("image"), validator(`add_news`), addnewsController);
router.get("", multer.single("image"), sendnewsController);
router.put("", multer.single("image"), validator(`update_news`), updatenewsController);
router.delete("",deletenewsController)
export default router;
