import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class CreateProductMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const { name, description, price, stock, imgUrl } = req.body;

        // if(!name) next (new Error("Name it's required."));
        // if(!description) next (new Error("Description it's required."));
        // if(!price) next (new Error("Price it's required."));
        // if(!imgUrl) next (new Error("ImgUrl it's required."));

        // if(typeof name !== "string") next (new Error("Name must be a string."));
        // if(typeof description !== "string") next (new Error("Description must be a string."));
        // if(typeof price !== "number") next (new Error("Price must be a number."));
        // if(typeof stock !== "boolean") next (new Error("Stock must be a boolean."));
        // if(typeof imgUrl !== "string") next (new Error("ImgUrl must be a string."));

        next();
    }
}