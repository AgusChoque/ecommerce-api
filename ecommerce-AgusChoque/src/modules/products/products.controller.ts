import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/Product.entity';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ProductDto } from './dto/product.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService:ProductsService) {};

    @HttpCode(200)
    @Get()
    async getProducts (@Query("page") page: string = "1", @Query("limit") limit: string = "5"):Promise<Product[]> {
        return await this.productsService.getProductsService(Number(page), Number(limit));
    };

    @HttpCode(201)
    @Get("seeder")
    async seederProducts () {
        return await this.productsService.seederProductsService();
    };
    
    @HttpCode(200)
    @Get(":id")
    async getProductById (@Param("id", ParseUUIDPipe) id: string): Promise<Product> {
        return await this.productsService.getProductService(id);
    };

    @HttpCode(201)
    @Post()
    async createProduct (@Body() product: ProductDto): Promise<string> {
        return await this.productsService.createProductService(product);
    };

    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @HttpCode(200)
    @Put(":id")
    async updateProduct (@Param("id", ParseUUIDPipe) id: string, @Body() product: ProductDto): Promise<string> {
        return await this.productsService.updateProductService(id, product);
    };

    @HttpCode(200)
    @Delete(":id")
    async deleteProduct (@Param("id", ParseUUIDPipe) id: string): Promise<string> {
        return await this.productsService.deleteProductService(id);
    };
};
