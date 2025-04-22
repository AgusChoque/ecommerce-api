import { IsNotEmpty, IsNumber, IsString } from "class-validator"

//TODO: Agregar mas validaciones
export class ProductDto {
    @IsNotEmpty()    
    @IsString()
    name: string

    @IsNotEmpty()    
    @IsString()
    description: string

    @IsNotEmpty()    
    @IsNumber()
    price: number

    @IsNotEmpty()    
    @IsNumber()
    stock: number
}