import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ProductDto } from './dto/product.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiBearerAuth, ApiBody, ApiExtraModels, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { bodyPostProduct, bodyPutProduct, limitGetProduct, pageGetProduct, paramIdDeleteProduct, paramIdGetProduct, paramIdPutProduct, responseDeleteProduct, responseGetProduct, responseGetProducts, responseGetSeederProduct, responsePostProduct, responsePutProduct } from 'src/helpers/openApiProducts';
import { ProductResponseDto } from './dto/productResponse.dto';
import { Product } from './entities/Product.entity';

@ApiExtraModels(ProductDto, Product)
@ApiTags('Products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService:ProductsService) {};

    // OPEN API
    @ApiOperation({ summary: 'Get a list of products by page and amount.' })
    @ApiResponse(responseGetProducts)
    @ApiQuery(pageGetProduct)
    @ApiQuery(limitGetProduct)
    // HTTP METHOD
    @HttpCode(200)
    @Get()
    // HANDLER
    async getProducts (@Query("page") page: string = "1", @Query("limit") limit: string = "5"):Promise<ProductResponseDto[]> {
        return await this.productsService.getProductsService(Number(page), Number(limit));
    };

    // OPEN API
    @ApiOperation({ summary: 'Perform the preloading of products.' })
    @ApiResponse(responseGetSeederProduct)
    // HTTP METHOD
    @HttpCode(201)
    @Get("seeder")
    // HANDLER
    async seederProducts () {
        return await this.productsService.seederProductsService();
    };
    
    // OPEN API
    @ApiOperation({ summary: 'Get product by ID' })
    @ApiResponse(responseGetProduct)
    @ApiParam(paramIdGetProduct)
    // HTTP METHOD
    @HttpCode(200)
    @Get(":id")
    // HANDLER
    async getProductById (@Param("id", ParseUUIDPipe) id: string): Promise<ProductResponseDto> {
        return await this.productsService.getProductService(id);
    };

    // OPEN API
    @ApiOperation({ summary: 'Create a product.' })
    @ApiResponse(responsePostProduct)
    @ApiBody(bodyPostProduct)
    // HTTP METHOD
    @HttpCode(201)
    @Post()
    // HANDLER
    async createProduct (@Body() product: ProductDto): Promise<string> {
        return await this.productsService.createProductService(product);
    };

    // OPEN API
    @ApiOperation({ summary: 'Update a product. You must be an admin.' })
    @ApiResponse(responsePutProduct)
    @ApiParam(paramIdPutProduct)
    @ApiBody(bodyPutProduct)
    @ApiBearerAuth()
    // AUTH
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    // HTTP METHOD
    @HttpCode(200)
    @Put(":id")
    // HANDLER
    async updateProduct (@Param("id", ParseUUIDPipe) id: string, @Body() product: ProductDto): Promise<string> {
        return await this.productsService.updateProductService(id, product);
    };

    // OPEN API
    @ApiOperation({ summary: 'Delete a product.' })
    @ApiResponse(responseDeleteProduct)
    @ApiParam(paramIdDeleteProduct)
    // HTTP METHOD
    @HttpCode(200)
    @Delete(":id")
    // HANDLER
    async deleteProduct (@Param("id", ParseUUIDPipe) id: string): Promise<string> {
        return await this.productsService.deleteProductService(id);
    };
};