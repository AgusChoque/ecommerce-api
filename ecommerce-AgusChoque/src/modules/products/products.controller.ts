import { Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/Product.entity';
import { Request } from 'express';
import { AuthGuard } from '../auth/auth.guard';

@Controller('products')
@UseGuards(AuthGuard)
export class ProductsController {
    constructor(private readonly productsService:ProductsService) {};

    @HttpCode(200)
    @Get()
    @UseGuards()
    getProducts (@Query("page") page: string = "1", @Query("limit") limit: string = "5"):Product[] {
        return this.productsService.getAllProducts(Number(page), Number(limit));
    };

    @HttpCode(200)
    @Get(":id")
    @UseGuards()
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
