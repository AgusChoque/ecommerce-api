import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class UpdateUserMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const id = Number(req.params.id);
        const { email, name, password, address, phone, country, city } = req.body;

        // if(!id) next(new Error("ID must be a number."));
        // if(id < 1 ) next(new Error("ID must be a positive number."));
        // if(!Number.isInteger(id)) next(new Error("ID must be an integer"));

        // if (email !== undefined && typeof email !== "string") next(new Error("Email must be a string"));
        // if (name !== undefined && typeof name !== "string") next(new Error("Name must be a string"));
        // if (password !== undefined && typeof password !== "string") next(new Error("Password must be a string"));
        // if (address !== undefined && typeof address !== "string") next(new Error("Address must be a string"));
        // if (phone !== undefined && typeof phone !== "string") next(new Error("Phone must be a string"));
        // if (country !== undefined && typeof country !== "string") next(new Error("Country must be a string"));
        // if (city !== undefined && typeof city !== "string") next(new Error("City must be a string"));

        // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        // if(password !== undefined && !passwordRegex.test(password)) next(new Error("Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character."));
        // if(phone !== undefined && phone.length !== 11 ) next(new Error("Phone must be 10 characters long."));

        next();
    };
};