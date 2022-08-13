import Joi from "joi";

export default {
    register: Joi.object({
        files: { image: Joi.required() },
        fields: { 
            fullname: Joi.string().required(),
            email: Joi.string().email().lowercase().required(),
            password: Joi.string().min(8).max(16).required(),
        }
    }),
    reset_password: Joi.object({
        password: Joi.string().min(8).max(16).required(),
    }),
}