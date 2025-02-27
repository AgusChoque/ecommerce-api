import { Injectable } from '@nestjs/common';
import { Product } from './entities/Product.entity';
import updateProductDto from 'src/dtos/updateProductDto.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product) private productsRepository: Repository<Product>) {}

    async getAllProducts (page: number, limit: number): Promise<Product[]> {
        return await this.productsRepository.find();
    };

    async getProductById (id: string): Promise<Product> {
        const product: Product | null = await this.productsRepository.findOneBy({id});
        if ( product ) {
            return product;
        } else {
            throw new Error("Product doesn't found.");
        }
    };

    async createProduct (newProduct: Omit<Product, "id">): Promise<string> {
        const product: Product = await this.productsRepository.create(newProduct);
        this.productsRepository.save(product);
        return product.id;
    };

    async updateProduct ({id, newData}: updateProductDto): Promise<string> {
        let product: Product | null = await this.productsRepository.findOneBy({id});
        if (product) {
            product = {...product, ... newData};
            this.productsRepository.save(product);
            return id;
        } else {
            throw new Error("Product doesn't found.");
        }
    };

    async deleteProduct (id: string): Promise<string> {
        await this.productsRepository.delete(id);
        return id;
    };

}
