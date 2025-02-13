import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/Product.entity';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService:ProductsService) {};

    @Get()
    getProducts ():Product[] {
        return this.productsService.getAllProducts();
    };
}
