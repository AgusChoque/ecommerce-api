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
    async getProducts (@Query("page") page: string = "1", @Query("limit") limit: string = "5"):Promise<Product[]> {
        return await this.productsService.getAllProducts(Number(page), Number(limit));
    };

    @HttpCode(200)
    @Get(":id")
    @UseGuards()
    async getProductById (@Param("id") id: string): Promise<Product> {
        return await this.productsService.getProductById(id);
    }

    @HttpCode(201)
    @Post()
    async createProduct (@Req() req: Request): Promise<string> {
        return await this.productsService.createProduct(req.body);
    }

    @HttpCode(200)
    @Put(":id")
    async updateProduct (@Param("id") id: string, @Req() req: Request): Promise<string> {
        return await this.productsService.updateProduct({id: id, newData: req.body});
    }

    @HttpCode(200)
    @Delete(":id")
    async deleteProduct (@Param("id") id: string): Promise<string> {
        return await this.productsService.deleteProduct(id);
    }
}
