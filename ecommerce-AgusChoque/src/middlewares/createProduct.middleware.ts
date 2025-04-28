import { ConflictException, Injectable, NestMiddleware } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NextFunction, Request, Response } from "express";
import { Product } from "src/modules/products/entities/Product.entity";
import { Repository } from "typeorm";

@Injectable()
export class CreateProductMiddleware implements NestMiddleware {
    constructor (
        @InjectRepository(Product)
        private readonly productDbRepository: Repository<Product>
    ) {};

    async use(req: Request, res: Response, next: NextFunction) {
        const { name } = req.body;

        const product = await this.productDbRepository.findOneBy({ name });
        if ( product ) throw new ConflictException("A product with this name already exists.");

        next();
    }
}