import { Joi, celebrate } from 'celebrate';
import { defaultSchema } from './defaultSchema';

export const create = celebrate({
    body: defaultSchema.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        due_date: Joi.date().optional()
    })
})