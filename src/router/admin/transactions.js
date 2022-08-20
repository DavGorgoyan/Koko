import { Router } from "express";
import { getTransactionsController } from "../../controllers/admin/transactions.js";
const router = Router();

router.get("", getTransactionsController)



export default router;