import * as Joi from '@hapi/joi';
import { ICustomSchema } from 'src/middleware/validate'

export const addUserSchema: ICustomSchema = {
  body: Joi.object({
    name: Joi.string().required().min(2),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(16),
    manager: Joi.number().min(0)
  })
}