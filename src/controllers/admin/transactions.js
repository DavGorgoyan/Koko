import { getResponseTemplate } from "../../lib/index.js";
import { exec } from "../../providers/db/operations.js";

export const getTransactionsController = async (req, res) => {
    const result = getResponseTemplate();
    try {
        const query =
            "SELECT p.uid, p.product_id, p.creation_date, u.fullname, u.image , pr.title FROM purchases p " +
            "LEFT JOIN users u " +
            "ON p.uid = u.uid " +
            "LEFT JOIN product pr " +
            "ON p.product_id = pr.id " +
            "ORDER BY p.creation_date DESC;"
        const sqlData = await exec(query);
        result.data = sqlData;

    } catch (err) {
        result.meta.error = {
            code: err.code || err.errCode || 5000,
            message: err.message || err.errMessage || "Unknown Error"
        };
        result.meta.status = err.status || err.statusCode || 500;
    }
    res.status(result.meta.status).json(result);
}