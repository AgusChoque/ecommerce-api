import { Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, Query, Req, SetMetadata, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/Product.entity';
import { Request } from 'express';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService:ProductsService) {};

    @SetMetadata("isPublic", true)
    @HttpCode(200)
    @Get()
    async getProducts (@Query("page") page: string = "1", @Query("limit") limit: string = "5"):Promise<Product[]> {
        return await this.productsService.getAllProducts(Number(page), Number(limit));
    };

    @HttpCode(201)
    @Get("seeder")
    async addProducts () {
        return await this.productsService.seederProducts();
    }
    
    @SetMetadata("isPublic", true)
    @HttpCode(200)
    @Get(":id")
    async getProductById (@Param("id", ParseUUIDPipe) id: string): Promise<Product> {
        return await this.productsService.getProductById(id);
    }

    @HttpCode(201)
    @Post()
    async createProduct (@Req() req: Request): Promise<string> {
        return await this.productsService.createProduct(req.body);
    }

    @HttpCode(200)
    @Put(":id")
    async updateProduct (@Param("id", ParseUUIDPipe) id: string, @Req() req: Request): Promise<string> {
        return await this.productsService.updateProduct({id: id, newData: req.body});
    }

    @HttpCode(200)
    @Delete(":id")
    async deleteProduct (@Param("id", ParseUUIDPipe) id: string): Promise<string> {
        return await this.productsService.deleteProduct(id);
    }
}
