import validateMiddleware from '../middleware/validate';
import { IRouteItem } from '../route';
import * as photoController from '../controller/photoController';
import { addPhotoSchema } from '../validate/addPhoto.schema';

export const photoRoute: IRouteItem[] = [
  {
    path: '/photo',
    method: 'post',
    middlewares: [
      validateMiddleware(addPhotoSchema, {}),
      photoController.addPhoto
    ]
  },
  {
    path: '/user/photo/:id',
    method: 'get',
    middlewares: [
      photoController.getUserPhoto
    ]
  },
  {
    path: '/photo/user/:id',
    method: 'get',
    middlewares: [
      photoController.getPhotoOwner
    ]
  },
]