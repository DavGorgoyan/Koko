import { getResponseTemplate } from "../../lib/index.js";
import { exec } from "../../providers/db/operations.js"

export const getConversatoinsController = async (req, res) => {
    const result = getResponseTemplate();
    try {
        const query = "SELECT c.uid, u.fullname, u.image FROM chat c " +
            "LEFT JOIN users u ON c.uid = u.uid " +
            `WHERE sender = "admin";`;
        const selected = await exec(query);
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

export const getChatMessagesController = async (req, res) => {
    const result = getResponseTemplate();
    try {
        const query =
            "SELECT c.id, c.sender, c.uid, c.content, c.creation_date, u.fullname, u.image FROM chat c " +
            "LEFT JOIN users u ON c.uid = u.uid " +
            `WHERE c.uid = ?; `;
        const selected = await exec(query, [req.query.uid])
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