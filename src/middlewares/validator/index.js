import { _VALIDATION_ERROR_ } from "../../helpers/err-codes.js";
import requestValidations from "./schemas.js";
 
const validate = (type) => (req, res, next) => {
    const currentValidation = requestValidations[type]; 
    
    if (currentValidation) {
        const fields = {};
        let files = {};

        if(req.file){
            files[req.file.fieldname] = req.file
        }
        else if(Array.isArray(req.files)){
            files[req.files[0].fieldname] = req.files;
        }else if(req.files){
            files = {...req.files};
        }
        
        for(let key in req.body){
            if(!(key in files))
                fields[key] = req.body[key];
        }

        const payload = { files, fields };
        

        const { error } = currentValidation.validate(payload);
        if (error) throw _WRONG_PARAMS_;
    }
    next();
}

export default validate;
