import { getResponseTemplate } from "../../lib/index.js";
import { insert, remove, select, update, exec } from "../../providers/db/operations.js";

export const getLastTenNewsController = async (req, res) => {
    const result = getResponseTemplate();
    try {
        const query =
            "SELECT id, title, creation_date, image FROM news " +
            "ORDER BY news.id " +
            "LIMIT 10;";
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

export const getCurrentNewsController = async (req, res) => {
    const result = getResponseTemplate();
    try {
        const selected = await select(`news`, "*", { id: req.params.id });
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

export const greatestRateBlogsController = async (req, res) => {
    const result = getResponseTemplate()
    try {
        const query =
            "SELECT b.title,b.image,b.id,b.views FROM blog AS b " +
            "LEFT JOIN rate AS r " +
            "ON b.id = r.blog_id " +
            "GROUP BY b.id " +
            "ORDER BY IFNULL(SUM(r.type), 0) DESC " +
            "LIMIT 10";
        const selected = await exec(query)
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

export const getCurrentBlogController = async (req, res) => {
    const result = getResponseTemplate();
    try {
        const selected = await select(`blog`, "*", { id: req.params.id })
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