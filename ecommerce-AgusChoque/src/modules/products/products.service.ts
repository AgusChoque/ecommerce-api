import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from './entities/Product.entity';

@Injectable()
export class ProductsService {
    constructor(private productsRepository: ProductsRepository) {}

    getAllProducts ():Product[] {
        return this.productsRepository.getAllProducts();
    }
}
