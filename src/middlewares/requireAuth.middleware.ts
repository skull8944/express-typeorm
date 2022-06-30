import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import log from "../utils/log";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.cookie?.substring(4);
  if (token) {
    jwt.verify(token, 'Feathery', (error, payload) => {
      if (error) res.status(401).json({
        message: error.message,
        error,
      })
      log.info(payload);
      return next();
    });
  };
}