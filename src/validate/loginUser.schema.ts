import * as Joi from '@hapi/joi';
import { ICustomSchema } from 'src/middleware/validate'

export const loginUserSchema: ICustomSchema = {
  body: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(16)
  })
}