import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUrl, IsUUID, Length, Matches } from "class-validator";

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
    @Matches(/^(?!0(\.0+)?$)\d+(\.\d+)?$/, {
        message: 'The number must be a positive decimal greater than 0',
    })
    price: string

    @ApiProperty({
        description: "Available stock quantity of the product."
    })
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    stock: number

    @ApiProperty({
        description: "UUID of the category to which this product belongs."
    })
    @IsString()
    @IsUUID()
    category: string

    @ApiProperty({
        description: "Optional image URL representing the product.",
        default: "https://res.cloudinary.com/dcuqpgmi5/image/upload/v1745813141/b0nxokfccuaqcvsnudqs.png",
        required: false
    })
    @IsOptional()
    @IsUrl()
    imgUrl?: string
}