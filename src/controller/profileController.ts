import { Request, Response } from 'express';
import { Profile } from 'src/entity/Profile';
import * as profileService from '../service/profileService';
import logger from '../utils/logger';

export const getProfile = async (req: Request, res: Response) => {
  const uid = req.params.uid;
  try {
    const result = await profileService.getProfile(uid);

    res.status(200).json(result.data);
  } catch (err) {
    logger.error(err.message);
    res.status(400).json({
      message: err.message
    })
  }
}

export const addProfile = async (req: Request, res: Response) => {
  const profile: Profile = req.body;
  try {
    const result = await profileService.addProfile(profile);

    res.status(201).json(result)
  } catch (err) {
    logger.error(err.message);
    res.status(400).json({
      message: err.message
    })
  }
}

export const editProfile = async (req: Request, res: Response) => {
  const profile: Profile = req.body;
  try {
    const result = await profileService.editProfile(profile);

    res.status(201).json(result)
  } catch (err) {
    logger.error(err.message);
    res.status(400).json({
      message: err.message
    })
  }
}
