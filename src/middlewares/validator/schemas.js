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
        files: {},
        fields: {
        password: Joi.string().min(8).max(16).required(), }
    }),
    add_news: Joi.object({
        files:{ image:Joi.required() },
        fields: {
            description: Joi.required(),
            title: Joi.required()
        }
    }),
    update_news: Joi.object({
        files: { image: Joi.any() },
        fields: {
            description: Joi.string(),
            title: Joi.string()
        }
    }),
    add_product: Joi.object({
        files: { image: Joi.required() },
        fields: { 
            description: Joi.required(),
            title: Joi.required(),
            price: Joi.number().required()
        }
    }),
    update_product: Joi.object({
        files: { image: Joi.any() },
        fields:{
        description: Joi.string() ,
        title: Joi.string(),
        price: Joi.number()
        }
    }),
    add_blog: Joi.object({
        files: { image: Joi.required() },
        fields:{
            description: Joi.string().required(),
            title: Joi.string().required()
        }
    }),
    update_blog: Joi.object({
        files: { image: Joi.any() },
        fields: {
            description: Joi.string(),
            title: Joi.string()
        }
    })
}