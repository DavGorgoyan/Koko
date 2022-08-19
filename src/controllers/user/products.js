import { _BALANCE_IS_NOT_ENOUGH_ } from "../../helpers/err-codes.js";
import { getResponseTemplate } from "../../lib/index.js";
import { exec, insert, remove, select, update } from "../../providers/db/operations.js";

export const buyProductController = async (req, res) => {
    const result = getResponseTemplate();
    try {
        const query = "UPDATE users u JOIN (SELECT price FROM product WHERE id = ?) p " +
            "SET u.balance = IF(u.balance >= p.price, u.balance - p.price, u.balance ) " +
            "WHERE uid = ?";

        const sqlData = await exec(query, [req.params.id, req.user.uid]);
        if (!sqlData.affectedRows)
            throw _BALANCE_IS_NOT_ENOUGH_;

        await insert(`purchases`, { product_id: req.params.id, uid: req.user.uid })
        result.data.message = "Request has ended successfully !!!"


    } catch (err) {
        result.meta.error = {
            code: err.code || err.errCode || 5000,
            message: err.message || err.errMessage || "Unknown Error"
        };
        result.meta.status = err.status || err.statusCode || 500;
    }
    res.status(result.meta.status).json(result);
}

export const getLastFiveProductsController = async (req, res) => {
    const result = getResponseTemplate();
    try {
        const query =
            "SELECT id, title, image FROM product " +
            "ORDER BY id DESC " +
            "LIMIT 5;";
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

export const getProductController = async (req, res) => {
    const result = getResponseTemplate();
    try {
        const { page = 1, rowsPerPage = 10 } = req.query;
        const query =
            "SELECT * FROM product " +
            "LIMIT ?,?"
        const selected = await exec(query, [(page - 1) * rowsPerPage, +rowsPerPage])
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

export const getCurrentProductController = async (req, res) => {
    const result = getResponseTemplate();
    try {
        const selected = await select(`product`, "*", { id: req.params.id });
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