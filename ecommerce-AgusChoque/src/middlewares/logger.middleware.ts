import { NextFunction, Request, Response } from "express";

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const now = new Date();

  console.log(`You are executing a ${req.method} method to the ${req.url} route on ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} at ${now.getHours()}:${now.getMinutes()} hrs.`);
  next();
};