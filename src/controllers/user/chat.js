import { getResponseTemplate } from "../../lib/index.js";
import { select } from "../../providers/db/operations.js"

export const getChatMessagesController = async (req, res) => {
    const result = getResponseTemplate();
    try {
        const selected = await select(`chat`, "*", { uid: req.user.uid });
        result.data = selected;

    } catch (err) {
        result.meta.error = {
            code: err.code || err.errCode || 5000,
            message: err.message || err.errMessage || "Unknown Error"
        };
        result.meta.status = err.status || err.statusCode || 500;
    }
    res.status(result.meta.status).json(result);

}