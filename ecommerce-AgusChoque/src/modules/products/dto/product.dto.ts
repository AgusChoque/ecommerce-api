import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class ProductDto {
    @ApiProperty({
        description: "Name of the product."
    })
    @IsNotEmpty()
    @IsString()
    @Length(3, 50)
    name: string

    @ApiProperty({
        description: "Detailed description of the product."
    })
    @IsNotEmpty()    
    @IsString()
    description: string

    @ApiProperty({
        description: "Price of the product in USD. Must have 2 decimal places."
    })
    @IsNotEmpty()
    @IsDecimal({decimal_digits: "2"})
    price: string

    @ApiProperty({
        description: "Available stock quantity of the product."
    })
    @IsNotEmpty()    
    @IsNumber()
    stock: number
}