import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class SigninMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;

        if(!email) next(new Error("Email it's required."));
        if(!password) next(new Error("Password it's required."));

        if(typeof email !== "string") next(new Error("Email must be a string."));
        if(typeof password !== "string") next(new Error("Password must be a string."));

        next();
    }
}