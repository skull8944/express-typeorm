import * as userController from '../controller/userController';
import validateMiddleware from '../middleware/validate';
import passport from '../middleware/passport';
import { IRouteItem } from '../route';
import { addUserSchema } from '../validate/addUser.schema';
import { loginUserSchema } from '../validate/loginUser.schema';

export const userRoute: IRouteItem[] = [
  {
    path: '/user',
    method: 'post',
    middlewares: [
      validateMiddleware(addUserSchema, {}),
      userController.addUser
    ]
  },
  {
    path: '/user',
    method: 'get',
    middlewares: [
      passport.authenticate('jwt'),
      userController.getUser
    ]
  },
  {
    path: '/user/photo/:id',
    method: 'get',
    middlewares: [
      userController.getUserPhoto
    ]
  },
  {
    path: '/user/login',
    method: 'post',
    middlewares: [
      validateMiddleware(loginUserSchema, {}),
      userController.login
    ]
  }
]