import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from './entities/Product.entity';
import updateProductDto from 'src/dtos/updateProductDto.interface';

@Injectable()
export class ProductsService {
    constructor(private productsRepository: ProductsRepository) {}

    getAllProducts (page: number, limit: number):Product[] {
        return this.productsRepository.findByPage(page, limit);
    };

    getProductById (id: number): Product {
        return this.productsRepository.findOneById(id);
    };

    createProduct (newProduct: Omit<Product, "id">): number {
        const product: Product = this.productsRepository.create(newProduct);
        this.productsRepository.save(product);
        return product.id;
    };

    updateProduct ({id, newData}: updateProductDto): number {
        let product: Product = this.productsRepository.findOneById(id);
        product = {...product, ... newData};
        this.productsRepository.save(product);
        return id;
    };

    deleteProduct (id: number): number {
        this.productsRepository.delete(id);
        return id;
    };

}
