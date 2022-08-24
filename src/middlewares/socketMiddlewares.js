import jwt from 'jsonwebtoken';
import { _TOKEN_IS_WRONG_, _WRONG_PARAMS_ } from '../helpers/err-codes.js';


export const auth = (type) => (socket, next) => {
    try {
        let { token } = socket.handshake.query;

        const secretKeys = {
            user: process.env.SECRET_KEY,
            admin: process.env.SECRET_KEY_ADMIN
        }
        const jwtSecret = secretKeys[type];

        token = typeof token == "string" ? token : "";
        const decoded = jwt.verify(token, jwtSecret);
        socket.data.tokenData = decoded;
        next();
    }
    catch (err) {
        const authorizationError = new Error();
        authorizationError.data = _TOKEN_IS_WRONG_;
        next(authorizationError);
    }
};

