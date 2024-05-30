import * as Joi from 'joi';

export const createUserSchema = Joi.object({
    first_name: Joi.string().lowercase().required(),
    last_name: Joi.string().lowercase().required(),
    email: Joi.string().email().required(),
});

