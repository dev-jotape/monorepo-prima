import { Joi, celebrate } from 'celebrate';
import { defaultSchema } from './defaultSchema';

export const create = celebrate({
    body: defaultSchema.object({
        username: Joi.string().required(),
        password: Joi.string().min(5).max(15).required()
    })
})