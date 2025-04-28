import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString, IsUUID, ValidateNested } from "class-validator";
import { ProductIdDto } from "./productId.dto";

export class CreateOrderDto {
    @ApiProperty({
        description: "Unique identifier of the user placing the order."
    })
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    userId: string

    @ApiProperty({
        description: "Array of objects with product IDs to be included in the order.",
        type: ProductIdDto,
        isArray: true
    })
    @IsNotEmpty()
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => ProductIdDto)
    products: ProductIdDto[]
};