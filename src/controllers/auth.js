import { _WRONG_PARAMS_, _WRONG_LOGIN_OR_PASSWORD,_TOKEN_IS_WRONG_,_RESET_CODE_IS_WRONG_ } from "../helpers/err-codes.js";
import { getResponseTemplate, hashingString, sendEmail } from "../lib/index.js";
import { v4 as uuid } from "uuid"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { insert, select, update } from "../providers/db/operations.js";



export const registerController = async (req, res) => {
    const result = getResponseTemplate();
    try {
        const payload = req.body;
        const selectedemail = await select(`admin`,"email");
        if (payload.email == selectedemail) {
            throw { code: 4060, message: `Էլ․հասցեն օգտագործվում է`, status: 406};
        }
        payload.uid = uuid();
        payload.password = await hashingString(payload.password);
        await insert(`users`, payload);
        result.data.message = "User registered successfully"

    } catch (err) {
        result.meta.error = {
            code: err.code || err.errCode || 5000,
            message: err.message || err.errMessage || "Unknown Error"
        };
        result.meta.status = err.status || err.statusCode || 500;
    }

    res.status(result.meta.status).json(result);
}