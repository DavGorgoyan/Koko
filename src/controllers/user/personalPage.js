import { getResponseTemplate } from "../../lib/index.js";
import { exec, insert, remove, select, update } from "../../providers/db/operations.js";


export const getBlogContoller = async (req, res) => {
    const result = getResponseTemplate();
    try {
        const selected = await select(`blog`, ["id", "title", "image"]);
        result.data = selected;

    } catch (err) {
        result.meta.error = {
            code: err.code || err.errCode || 5000,
            message: err.message || err.errMessage || "Unknown Error"
        };
        result.meta.status = err.status || err.statusCode || 500;
    }
    res.status(result.meta.status).json(result);
};

export const addBlogController = async (req, res) => {
    const result = getResponseTemplate();
    try {
        await insert(`blog`, { uid: req.user.uid, ...req.body });
        result.data.message = "Request has ended siccessfully !!!";

    } catch (err) {
        result.meta.error = {
            code: err.code || err.errCode || 5000,
            message: err.message || err.errMessage || "Unknown Error"
        };
        result.meta.status = err.status || err.statusCode || 500;
    }
    res.status(result.meta.status).json(result);
};

export const updateBlogController = async (req, res) => {
    const result = getResponseTemplate();
    try {
        await update(`blog`, req.body, { id: req.params.id });
        result.data.message = "Request has ended successfully !!!";

    } catch (err) {
        result.meta.error = {
            code: err.code || err.errCode || 5000,
            message: err.message || err.errMessage || "Unknown Error"
        };
        result.meta.status = err.status || err.statusCode || 500;
    }
    res.status(result.meta.status).json(result);
};

export const deleteBlogController = async (req, res) => {
    const result = getResponseTemplate();
    try {
        await remove(`blog`, { id: req.params.id });
        result.data.message = "Request has ended successfully !!!"

    } catch (err) {
        result.meta.error = {
            code: err.code || err.errCode || 5000,
            message: err.message || err.errMessage || "Unknown Error"
        };
        result.meta.status = err.status || err.statusCode || 500;
    }
    res.status(result.meta.status).json(result);
};

export const getPurchasesController = async (req, res) => {
    const result = getResponseTemplate();
    try {
        const query = "SELECT pr.id, pr.title, pr.description, pr.image, pr.price " +
            "FROM product pr " +
            "LEFT JOIN purchases pu ON " +
            "pr.id = pu.product_id " +
            "WHERE pu.uid = ?;";
        const sqlData = await exec(query, [req.user.uid]);
        result.data = sqlData;

    } catch (err) {
        result.meta.error = {
            code: err.code || err.errCode || 5000,
            message: err.message || err.errMessage || "Unknown Error"
        };
        result.meta.status = err.status || err.statusCode || 500;
    }
    res.status(result.meta.status).json(result);
};