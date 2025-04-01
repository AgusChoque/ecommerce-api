import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class CreateUserMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const { email, name, password, address, phone, country, city } = req.body;

        // if(!email) next(new Error("Email it's required."));
        // if(!name) next(new Error("Name it's required."));
        // if(!password) next(new Error("Password it's required."));
        // if(!address) next(new Error("Address it's required."));
        // if(!phone) next(new Error("Phone it's required."));

        // if (typeof email !== "string") next(new Error("Email must be a string"));
        // if (typeof name !== "string") next(new Error("Name must be a string"));
        // if (typeof password !== "string") next(new Error("Password must be a string"));
        // if (typeof address !== "string") next(new Error("Address must be a string"));
        // if (typeof phone !== "string") next(new Error("Phone must be a string"));
        // if (country !== undefined && typeof country !== "string") next(new Error("Country must be a string"));
        // if (city !== undefined && typeof city !== "string") next(new Error("City must be a string"));

        // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        // if(!passwordRegex.test(password)) next(new Error("Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character."));
        // if(phone.length !== 11 ) next(new Error("Phone must be 10 characters long."));

        next();
    };
};