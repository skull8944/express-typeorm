import * as Joi from '@hapi/joi';
import { ICustomSchema } from 'src/middleware/validate'

export const addProfileSchema: ICustomSchema = {
  body: Joi.object({
    uid: Joi.number().required().min(0),
    height: Joi.number().required().min(0).max(200),
    weight: Joi.number().required().min(0).max(200),
  })
}