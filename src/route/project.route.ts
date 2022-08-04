import * as projectController from '../controller/projectController';
import validateMiddleware from '../middleware/validate';
import { IRouteItem } from '../route';
import { addProjectSchema } from '../validate/addProject.schema';

export const projectRoute: IRouteItem[] = [
  {
    path: '/project/user/:pid',
    method: 'get',
    middlewares: [
      projectController.getProjectMembers
    ]
  },
  {
    path: '/user/project/:uid',
    method: 'get',
    middlewares: [
      projectController.getUserProjects
    ]
  },
  {
    path: '/project',
    method: 'get',
    middlewares: [
      projectController.getProjects
    ]
  },
  {
    path: '/project',
    method: 'post',
    middlewares: [
      validateMiddleware(addProjectSchema, {}),
      projectController.addProject
    ]
  },
]