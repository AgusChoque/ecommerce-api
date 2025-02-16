import { Controller, Delete, Get, HttpCode, Param, Post, Put, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/Product.entity';
import { Request } from 'express';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService:ProductsService) {};

    @HttpCode(200)
    @Get()
    getProducts ():Product[] {
        return this.productsService.getAllProducts();
    };

    @HttpCode(200)
    @Get(":id")
    getProductById (@Param("id") id: string): Product {
        return this.productsService.getProductById(Number(id));
    }

    @HttpCode(201)
    @Post()
    createProduct (@Req() req: Request): number {
        return this.productsService.createProduct(req.body);
    }

    @HttpCode(200)
    @Put(":id")
    updateProduct (@Param("id") id: string, @Req() req: Request): number {
        return this.productsService.updateProduct({id: Number(id), newData: req.body});
    }

    @HttpCode(200)
    @Delete(":id")
    deleteProduct (@Param("id") id: string): number {
        return this.productsService.deleteProduct(Number(id));
    }
}
