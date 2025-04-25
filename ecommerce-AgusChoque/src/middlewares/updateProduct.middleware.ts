import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class UpdateProductMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const id = Number(req.params.id);
        const { name, description, price, stock, imgUrl } = req.body

        // if(!id) next(new Error("ID must be a number."));
        // if(id < 1 ) next(new Error("ID must be a positive number."));
        // if(!Number.isInteger(id)) next(new Error("ID must be an integer"));

        // if(name !== undefined && typeof name !== "string") next (new Error("Name must be a string."));
        // if(description !== undefined && typeof description !== "string") next (new Error("Description must be a string."));
        // if(price !== undefined && typeof price !== "number") next (new Error("Price must be a number."));
        // if(stock !== undefined && typeof stock !== "boolean") next (new Error("Stock must be a boolean."));
        // if(imgUrl !== undefined && typeof imgUrl !== "string") next (new Error("ImgUrl must be a string."));

        next();
    };
};