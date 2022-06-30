import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pgDataSource } from "../datasources/pgDataSoutce";
import { User } from "../entities/User.entity";
import log from "../utils/log";

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = pgDataSource.getRepository(User).create(req.body);
    const result = await pgDataSource.getRepository(User).save(user);

    return res.status(201).json(result)
  } catch (error: any) {
    log.error(error.message);
    return res.status(401).json({
      message: error.message,
      error
    });
  }  
}

export const loginUser = async (req:Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await pgDataSource.getRepository(User).findOneBy({email});
    if (!user) return res.status(404).send(`no this user`);
    
    const available = await bcrypt.compare(password, user.password);
    if (!available) return res.status(401).send(`wrong password`);
    
    const token = jwt.sign(user.id, 'Feathery')
    res.cookie('jwt', token, { maxAge: 24*60*60*1000, httpOnly: true })
    return res.status(200).json({ token });
  } catch (error: any) {
    log.error(error.message);
    return res.status(404).json({
      message: error.message,
      error
    })
  }  
}

export const getUsers = async (req: Request, res: Response) => {
  try {    
    const users = await pgDataSource.getRepository(User).find(undefined);

    return res.status(200).json({
      users
    })
  } catch (error: any) {
    log.error(error.message);
    return res.status(404).json({
      message: error.message,
      error
    })
  }  
}

export const updateUser = async (req: Request, res:Response) => {
  const { email, name } = req.body;
  log.info(email, name)
  try {
    const result = pgDataSource
      .createQueryBuilder()
      .update(User)
      .set({
        name: name
      })
      .where("email = :email", {email: email})
      .execute()
    log.info(result)
    return res.status(200).send(result);
  } catch (error: any) {
    log.error(error.message);
    return res.status(404).json({
      message: error.message,
      error
    })
  }  
}

export const deleteUser = async (req: Request, res:Response) => {
  const { email } = req.body;
  try {
    const result = pgDataSource
      .createQueryBuilder()
      .delete()
      .from(User)
      .where("email = :email", {email: email})
      .execute()
    log.info(result)
    return res.status(200).send(result);
  } catch (error: any) {
    log.error(error.message);
    return res.status(404).json({
      message: error.message,
      error
    })
  }  
}