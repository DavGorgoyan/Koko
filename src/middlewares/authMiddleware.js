import jwt from "jsonwebtoken";
import { _TOKEN_IS_WRONG_ } from "../helpers/err-codes.js";
import { select } from '../providers/db/operations.js';

const authMiddleware = (type) => async (req, res, next) => {
  try {
    const token = (req.headers.authorization.split(" "))[1];

    const secret_key = type == 'users' ?  process.env.SECRET_KEY : process.env.SECRET_KEY_ADMIN;
    const decoded = jwt.verify(token, secret_key);

    const currentUser = (await select(decoded.type, `*`, { uid: decoded.uid }))[0];
    if (!currentUser) throw 1;

    req.user = currentUser;

    next();
  } catch (err) {
    res.status(_TOKEN_IS_WRONG_.status).json({
      meta: {
        error: { code: _TOKEN_IS_WRONG_.code, message: _TOKEN_IS_WRONG_.message },
        status: _TOKEN_IS_WRONG_.status
      },
      data: {}
    })
  }
}

export default authMiddleware;


