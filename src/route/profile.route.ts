import * as profileController from '../controller/profileController';
import validateMiddleware from '../middleware/validate';
import { addProfileSchema } from '../validate/addProfile.schema';
import { IRouteItem } from '../route';

export const profileRoute: IRouteItem[] = [
  {
    path: '/profile/:uid',
    method: 'get',
    middlewares: [
      profileController.getProfile
    ]
  },
  {
    path: '/profile',
    method: 'post',
    middlewares: [
      validateMiddleware(addProfileSchema, {}),
      profileController.addProfile
    ]
  },
  {
    path: '/profile',
    method: 'put',
    middlewares: [
      profileController.editProfile
    ]
  },
]