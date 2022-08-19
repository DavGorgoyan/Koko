import { getResponseTemplate } from "../../lib/index.js";
import { insert, remove, select, update } from "../../providers/db/operations.js";


export const addnewsController = async (req,res) => {
    const result = getResponseTemplate();
    try {
        await insert(`news`,{title:req.body.title,description:req.body.description,image:req.body.image})
        result.data.message = "Request has ended successfully !!!"
    }catch (err) {
        result.meta.error = {
            code: err.code || err.errCode || 5000,
            message: err.message || err.errMessage || "Unknown Error"
        };
        result.meta.status = err.status || err.statusCode || 500;
    }
    res.status(result.meta.status).json(result);
}

export const sendnewsController = async (req,res) => {
    const result = getResponseTemplate();
    try {
        const selected = await select(`news`,"*",{id:req.query.id});
        result.data = selected;
        
    }catch (err) {
        result.meta.error = {
            code: err.code || err.errCode || 5000,
            message: err.message || err.errMessage || "Unknown Error"
        };
        result.meta.status = err.status || err.statusCode || 500;
    }
    res.status(result.meta.status).json(result);
}

export const updatenewsController = async (req,res) => {
    const result = getResponseTemplate();
    try {
        await update(`news`, req.body, {id: req.query.id})
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

export const deletenewsController = async (req,res) => {
    const result = getResponseTemplate();
    try {
        await remove(`news`,{id: req.query.id});
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