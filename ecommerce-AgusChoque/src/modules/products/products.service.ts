import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
    getAllProducts ():string {
        return "All products."
    }
}
