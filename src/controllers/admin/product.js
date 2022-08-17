import { getResponseTemplate } from "../../lib/index.js";
import { insert, remove, select, update } from "../../providers/db/operations.js";

export const getproductController = async (req,res) => {
    const result = getResponseTemplate();
    try {
        const selected = await select(`product`,"*",{id: req.query.id})
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

export const addproductController = async (req,res) => {
    const result = getResponseTemplate();
    try {
        await insert(`product`,{title: req.body.title, description: req.body.description,price: req.body.price, image: req.body.image})
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

export const updateproductController = async (req,res) => {
    const result = getResponseTemplate();
    try {
        await update(`product`, req.body,{id: req.query.id});
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

export const deleteproductController = async (req,res) => {
    const result = getResponseTemplate();
    try {
        await remove(`product`,{id: req.query.id})
        result.data.message = "Request has ended successfully !!!"
        
    }catch (err) {
        result.meta.error = {
            code: err.code || err.errCode || 5000,
            message: err.message || err.errMessage || "Unknown Error"
        };
        result.meta.status = err.status || err.statusCode || 500;
    }
    res.status(result.meta.status).json(result)
}