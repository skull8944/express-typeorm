import * as Joi from '@hapi/joi';
import { ICustomSchema } from 'src/middleware/validate'

export const addPhotoSchema: ICustomSchema = {
  body: Joi.object({
    url: Joi.string().required().min(2),
    uid: Joi.number().required().min(0)
  })
}