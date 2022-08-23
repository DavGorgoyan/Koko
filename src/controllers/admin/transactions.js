import { getResponseTemplate } from "../../lib/index.js";
import { exec } from "../../providers/db/operations.js";

export const getTransactionsController = async (req, res) => {
    const result = getResponseTemplate();
    try {
        const query =
            "SELECT p.uid,u.fullname,u.image as user_image,p.product_id, p.creation_date, pr.title FROM purchases p " +
            "LEFT JOIN users u " +
            "ON p.uid = u.uid " +
            "LEFT JOIN product pr " +
            "ON p.product_id = pr.id " +
            "ORDER BY p.creation_date DESC;"

        const query2 =
            "SELECT u.`uid`,u.`fullname`,u.image as user_image,bt.`blog_id`,bt.`creation_date`,b.`image` as blog_image,b.`title` FROM blog b " +
            "INNER JOIN bonus_trans bt ON b.id = bt.`blog_id` " +
            "LEFT JOIN users u ON B.`uid` = u.`uid` " +
            "ORDER BY bt.creation_date;";

        const sqlData2 = await exec(query2);
        const sqlData = await exec(query);
        result.data.purchase_transaction = sqlData;
        result.data.bonus_transaction = sqlData2;

    } catch (err) {
        result.meta.error = {
            code: err.code || err.errCode || 5000,
            message: err.message || err.errMessage || "Unknown Error"
        };
        result.meta.status = err.status || err.statusCode || 500;
    }
    res.status(result.meta.status).json(result);
}