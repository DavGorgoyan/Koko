import multer, { diskStorage } from "multer";
import { _WRONG_PARAMS_ } from "../../helpers/err-codes.js";
import filesTypes from "./filesjsTypes.js";

// import { addWaterMarkToFile, getFilePath } from '../../lib';
class MyError extends Error {
    constructor({ message, code, status }) {
      super(message);
      this.code = code;
      this.message = message;
      this.status = status;
    }
}

const multerOptions = {
    storage: diskStorage({
        destination(req, file, cb) {
            cb(null, `public/protected_files`);
        },
        filename(req, file, cb) {
            const fileName = Date.now() + `--` + file.originalname.replace(/ +/g,"_");;

            req.body[file.fieldname] = req.body[file.fieldname]
            ? Array.isArray(req.body[file.fieldname])
                ? [...req.body[file.fieldname], fileName]
                : [req.body[file.fieldname], fileName]
            : fileName;

            cb(null, fileName);
        }
    }),
    fileFilter(req, file, cb) { 
        const [fileType, fileFormat] = file.mimetype.split(`/`);

        if (!req.fromMiddleware?.filesTypesKey) {
            if (fileType != `image`)  
                cb(new MyError(_WRONG_PARAMS_));
        } else {
            const currentType = filesTypes[req.fromMiddleware.filesTypesKey];
            if (currentType) { 
                if (currentType.forAll) {
                    if( fileType != currentType.type){
                        cb(new MyError(_WRONG_PARAMS_));
                    } 
                } else {
                    const validTypes = currentType[file.fieldname] ? currentType[file.fieldname].split(`/`) : [];
                    if(!validTypes.includes(fileType))
                        cb(new MyError(_WRONG_PARAMS_));
                }
            }
        }
        cb(null, true)

    }
}

export const fType = (type) => (req, res, next) => {
    if (req.fromMiddleware)
        req.fromMiddleware.filesTypesKey = type;
    else
        req.fromMiddleware = { filesTypesKey: type };
    next();
}


export default multer(multerOptions);
