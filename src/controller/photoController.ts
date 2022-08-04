import { Request, Response } from 'express';
import * as photoService from '../service/photoService';
import logger from '../utils/logger';

export const addPhoto = async (req: Request, res: Response) => {
  try {
    const { url, uid } = req.body;
    const result = await photoService.addPhoto(url, uid);

    return res.status(201).json({
      'message': 'photo created',
      result
    })
  } catch (err) {
    logger.error(err.message);
    res.status(400).json({
      message: err.message
    })
  }
}


export const getUserPhoto = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await photoService.getUserPhoto(id);
    console.log(result);

    res.status(200).json(result.data);
  } catch (err) {
    logger.error(err.message);
    res.status(400).json({
      message: err.message
    })
  }
}


export const getPhotoOwner = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await photoService.getPhotoOwner(id);

    res.status(200).json(result.data);
  } catch (err) {
    logger.error(err.message);
    res.status(400).json({
      message: err.message
    })
  }
}