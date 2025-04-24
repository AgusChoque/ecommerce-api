import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { Product } from "src/modules/products/entities/Product.entity";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    userId: string

    @IsNotEmpty()
    @IsArray()
    @ArrayNotEmpty()
    @Type(() => Product)
    products: Partial<Product>[]
};