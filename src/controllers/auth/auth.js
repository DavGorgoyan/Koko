
import { _WRONG_PARAMS_, _WRONG_LOGIN_OR_PASSWORD,_TOKEN_IS_WRONG_,_RESET_CODE_IS_WRONG_ } from "../../helpers/err-codes.js";
import { getResponseTemplate, hashingString, sendEmail } from "../../lib/index.js";
import { v4 as uuid } from "uuid"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { insert, select, update,exec } from "../../providers/db/operations.js";

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


export const loginController = async (req,res) => { 
    const result = getResponseTemplate();
    try {
            const query = "SELECT uid, email, password, 'users' AS type FROM users " +
                          "WHERE email = ? " + 
                          "UNION " +
                          "SELECT uid, email, password, 'admin' AS type FROM admin " +
                          "WHERE email = ? ";
            const [currentUser] = await exec(query, [req.body.email, req.body.email]);
            if (!currentUser) throw _WRONG_LOGIN_OR_PASSWORD;
    
            const compare = await bcrypt.compare(req.body.password, currentUser.password);
            if (!compare) throw _WRONG_LOGIN_OR_PASSWORD;
    
            const secret_key = currentUser.type == 'users' ? process.env.SECRET_KEY : process.env.SECRET_KEY_ADMIN; 
            const token = jwt.sign({
                uid: currentUser.uid
            }, secret_key, { expiresIn: 60 * 60 * 24 * 365 });

            result.data = { token, type: currentUser.type };
        
    } catch (err) {
        result.meta.error = {
            code: err.code || err.errCode || 5000,
            message: err.message || err.errMessage || "Unknown Error"
        };
        result.meta.status = err.status || err.statusCode || 500;
    }
    res.status(result.meta.status).json(result);
} 


export const forgetpasswordController = async (req,res) => {
    const result = getResponseTemplate();
    try {
        const currentUser = (await select(`users`, `*`, { email: req.body.email }))[0];
        if (!currentUser) throw { status: 401, message: "Not recognised user" };
        let randomCode = Math.floor(Math.random() * (100000 - 999999 + 1)) + 999999;
        const codeForJwt = await hashingString(randomCode);

        const token = jwt.sign({
            uid: currentUser.uid,
            code: codeForJwt
        }, process.env.SECRET_KEY, { expiresIn: 60 * 60 * 24 * 365 });

        await sendEmail(currentUser.email, "RESET CODE", randomCode);
        result.data.token = token;
        
    } catch (err) {
        result.meta.error = {
            code: err.code || err.errCode || 5000,
            message: err.message || err.errMessage || "Unknown Error"
        };
        result.meta.status = err.status || err.statusCode || 500;
    }
    res.status(result.meta.status).json(result);
}


export const checkcodeController = async (req,res) => {
    const result = getResponseTemplate();
    try {
        const { token } = req.headers;
        if (!token) throw _TOKEN_IS_WRONG_;
        const { code } = req.body;
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        const compared = await bcrypt.compare(code + "", decoded.code + "");
        if (!compared) throw  _RESET_CODE_IS_WRONG_;

        const [currentUser] = await select("users", "*", { uid: decoded.uid });
        if (!currentUser) throw { status: 406, message: "Wrong params" };

        const newToken = jwt.sign({
            uid: currentUser.uid,
            password: currentUser.password
        }, process.env.SECRET_KEY, { expiresIn: 60 * 60 * 24 * 365 });
        result.data.token = newToken;
        
    }  catch (err) {
        result.meta.error = {
            code: err.code || err.errCode || 5000,
            message: err.message || err.errMessage || "Unknown Error"
        };
        result.meta.status = err.status || err.statusCode || 500;
    }
    res.status(result.meta.status).json(result);
}


export const resetPasswordController = async(req,res) => {
    const result = getResponseTemplate();
    try {
        const token = req.headers.token;
        if (!token) throw  _TOKEN_IS_WRONG_;
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const currentUser = (await select("users", "*", { password: decoded.password }))[0];
        if (!currentUser) throw _WRONG_LOGIN_OR_PASSWORD;
        const newPassword = await hashingString(req.body.password);
        await update(`users`, { password: newPassword }, { uid: currentUser.uid })
        result.data.message = "Request has ended successfully";
        
    }  catch (err) {
        result.meta.error = {
            code: err.code || err.errCode || 5000,
            message: err.message || err.errMessage || "Unknown Error"
        };
        result.meta.status = err.status || err.statusCode || 500;
    }
    res.status(result.meta.status).json(result);
}