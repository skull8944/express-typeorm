import * as Joi from '@hapi/joi';
import { ICustomSchema } from 'src/middleware/validate'

export const addProjectSchema: ICustomSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    member: Joi.array().items(Joi.number())
  })
}