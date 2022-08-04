import { Request, Response } from 'express';
import * as projectService from '../service/projectService';
import logger from '../utils/logger';

export const getUserProjects = async (req: Request, res: Response) => {
  try {
    const uid = req.params.uid;
    const result = await projectService.getUserProjects(uid);

    res.status(200).json(result.data)
  } catch (err) {
    logger.error(err);
    res.status(400).json({
      message: err.messae
    })
  }
}

export const getProjectMembers = async (req: Request, res: Response) => {
  try {
    const pid = req.params.pid;
    const result = await projectService.getProjectMembers(pid);

    res.status(200).json(result.data)
  } catch (err) {
    logger.error(err);
    res.status(400).json({
      message: err.messae
    })
  }
}

export const getProjects = async (req: Request, res: Response) => {
  try {
    const result = await projectService.getProjects();

    res.status(200).json(result.data)
  } catch (err) {
    logger.error(err);
    res.status(400).json({
      message: err.messae
    })
  }
}

export const addProject = async (req: Request, res: Response) => {
  const { name, member } = req.body;
  try {
    const result = await projectService.addProject(name, member)

    return res.status(201).json(result)
  } catch (err) {
    logger.error(err);
    res.status(400).json({
      message: err.messae
    })
  }
}
