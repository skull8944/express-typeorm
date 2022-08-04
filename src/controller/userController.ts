import { NextFunction, Request, Response } from 'express';
import { User } from 'src/entity/User';
import * as userService from '../service/userService';

export const addUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body as Omit<User, 'id'>
    return res.json(await userService.addUser(user));
  } catch (err) {
    next(err);
  }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json(await userService.getUser())
  } catch (err) {
    next(err);
  }
}

export const getUserPhoto = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const result = await userService.getUserPhoto(id)
    return res.status(200).json(result.data);
  } catch (err) {
    next(err);
  }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const result = await userService.login(email, password);

    if (!result.success) return res.status(400).json(result);
    res.cookie(
      'jwt', result.data,
      { httpOnly: true, maxAge: 60 * 60 * 24 * 1000 }
    );
    return res.json(result)
  } catch (err) {
    next(err);
  }
}