import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString, IsUUID } from "class-validator"
import { Product } from "src/modules/products/entities/Product.entity"

//TODO: Revisar validaciones
export class CreateOrderDto {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    userId: string

    @IsNotEmpty()
    @IsArray()
    @ArrayNotEmpty()
    products: Partial<Product>[]
};