import { Injectable } from '@nestjs/common';
import { Product } from './entities/Product.entity';
import { ProductDto } from './dto/product.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
    constructor(
        private readonly productsRepository: ProductsRepository
    ) {};

    async getProductsService (page: number, limit: number): Promise<Product[]> {
        return await this.productsRepository.getProductsRepository(page, limit);
    };

    async getProductService (id: string): Promise<Product> {
        return await this.productsRepository.getProductRepository(id);
    };
    
    async seederProductsService (): Promise<string> {
        return await this.productsRepository.seederProductsRepository();
    };
    
    async createProductService (newProduct: ProductDto): Promise<string> {
        return await this.productsRepository.createProductRepository(newProduct);
    };

    async updateProductService (id: string, newProduct: ProductDto): Promise<string> {
        return await this.productsRepository.updateProductRepository(id, newProduct);
    };

    async deleteProductService (id: string): Promise<string> {
        return await this.productsRepository.deleteProductRepository(id);
    };


};
