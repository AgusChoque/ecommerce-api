import { IsDecimal, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class ProductDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 50)
    name: string

    @IsNotEmpty()    
    @IsString()
    description: string

    @IsNotEmpty()
    @IsDecimal({decimal_digits: "2"})
    price: number

    @IsNotEmpty()    
    @IsNumber()
    stock: number
}