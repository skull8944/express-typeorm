import { Request, RequestHandler, Response } from 'express';
import { photoRoute } from './route/photo.route';
import { profileRoute } from './route/profile.route';
import { projectRoute } from './route/project.route';
import { userRoute } from './route/user.route';

export interface IRouteItem {
  path: string;
  method: 'get' | 'post' | 'put' | 'delete';
  middlewares: RequestHandler[];
}

const getNotFoundPage = (req: Request, res: Response) => res.sendStatus(404)

export const AppRoutes: IRouteItem[] = [
  ...profileRoute,
  ...userRoute,
  ...projectRoute,
  ...photoRoute,
  {
    path: '*',
    method: 'get',
    middlewares: [getNotFoundPage]
  }
];
