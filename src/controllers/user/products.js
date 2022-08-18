import { getResponseTemplate } from "../../lib/index.js";
import { exec, insert, remove, select, update } from "../../providers/db/operations.js";

export const buyProductController = async (req, res) => {
    const result = getResponseTemplate();
    try {
        await insert(`purchases`, { product_id: req.params.id, uid: req.user.uid });
        const [{ balance }] = await select(`users`, ["balance"], { uid: req.user.uid });
        const [{ price }] = await select(`product`, ["price"], { id: req.params.id });
        const newbalance = +(balance) - (+price);
        await update(`users`, { balance: newbalance }, { uid: req.user.uid });
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

export const getPaginatedProductController = async (req, res) => {
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