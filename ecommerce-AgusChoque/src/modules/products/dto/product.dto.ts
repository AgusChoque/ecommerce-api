import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class ProductDto {
    @ApiProperty({
        description: "Name of the product.",
        example: "Wireless Headphones"
    })
    @IsNotEmpty()
    @IsString()
    @Length(3, 50)
    name: string

    @ApiProperty({
        description: "Detailed description of the product.",
        example: "High-quality wireless headphones with noise cancellation."
    })
    @IsNotEmpty()    
    @IsString()
    description: string

    @ApiProperty({
        description: "Price of the product in USD. Must have 2 decimal places.",
        example: 199.99
    })
    @IsNotEmpty()
    @IsDecimal({decimal_digits: "2"})
    price: number

    @ApiProperty({
        description: "Available stock quantity of the product.",
        example: 150
    })
    @IsNotEmpty()    
    @IsNumber()
    stock: number
}