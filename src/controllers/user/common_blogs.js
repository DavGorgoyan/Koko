import { getResponseTemplate } from "../../lib/index.js";
import { exec, insert, remove, select, update } from "../../providers/db/operations.js";

export const getGreatestRateBlogsController = async (req, res) => {
    const result = getResponseTemplate();
    try {
        const query =
            "SELECT b.title,b.image,b.id,b.views FROM blog AS b " +
            "LEFT JOIN rate AS r " +
            "ON b.id = r.blog_id " +
            "GROUP BY b.id " +
            "ORDER BY IFNULL(SUM(r.type), 0) DESC " +
            "limit 10";
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

export const getLastTenBlogsController = async (req, res) => {
    const result = getResponseTemplate();
    try {
        const query =
            "SELECT * FROM blog " +
            "ORDER BY id DESC " +
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

export const getAllBlogsController = async (req, res) => {
    const result = getResponseTemplate();
    try {
        const { page = 1, rowsPerPage = 10 } = req.query;
        const query =
            "SELECT * FROM blog " +
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

export const getCurrentBlogControlller = async (req, res) => {
    const result = getResponseTemplate();
    try {
        const [selected] = await select("blog", "*", { id: req.params.id });
        if (selected) {
            let view = selected.views;
            view++;
            await update(`blog`, { views: view }, { id: req.params.id })
            result.data = selected;
        } else
            result.data = {};

    } catch (err) {
        result.meta.error = {
            code: err.code || err.errCode || 5000,
            message: err.message || err.errMessage || "Unknown Error"
        };
        result.meta.status = err.status || err.statusCode || 500;
    }
    res.status(result.meta.status).json(result);
}

export const getCommentsToBlogController = async (req, res) => {
    const result = getResponseTemplate();
    try {
        const query =
            "SELECT c.id,c.description,u.fullname,u.image,u.uid FROM comments c " +
            "LEFT JOIN users u " +
            "ON c.uid = u.uid " +
            "WHERE c.blog_id = ?";
        const selected = await exec(query, [req.params.id]);
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

export const addCommentController = async (req, res) => {
    const result = getResponseTemplate();
    try {
        await insert(`comments`, { description: req.body.description, blog_id: req.query.id, uid: req.user.uid });
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

export const rateBlogController = async (req, res) => {
    const result = getResponseTemplate();
    try {
        await insert(`rate`, { uid: req.user.uid, blog_id: req.query.id, type: req.query.rate })
        result.data.message = "Request has ended successfully !!!";

    } catch (err) {
        result.meta.error = {
            code: err.code || err.errCode || 5000,
            message: err.message || err.errMessage || "Unknown Error"
        };
        result.meta.status = err.status || err.statusCode || 500;
    }
    res.status(result.meta.status).json(result);
}

export const deleteCommentController = async (req, res) => {
    const result = getResponseTemplate();
    try {
        await remove(`comments`, { id: req.params.id, uid: req.user.uid });
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

export const updateCommentsController = async (req, res) => {
    const result = getResponseTemplate();
    try {
        await update(`comments`, req.body, { id: req.params.id, uid: req.user.uid })
        result.data.message = "Request has ended successfully !!!"

    } catch (err) {
        result.meta.error = {
            code: err.code || err.errCode || 5000,
            message: err.message || err.errMessage || "Unknown Error"
        };
        result.meta.status = err.status || err.statusCode || 500;
    }
    res.status(result.meta.status).json(result)
}