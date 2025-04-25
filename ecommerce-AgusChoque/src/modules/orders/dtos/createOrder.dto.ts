import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString, IsUUID, ValidateNested } from "class-validator";
import { ProductIdDto } from "./productId.dto";

export class CreateOrderDto {
    @ApiProperty({
        description: "Unique identifier of the user placing the order.",
        example: "550e8400-e29b-41d4-a716-446655440000"
    })
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    userId: string

    @ApiProperty({
        description: "Array of objects with product IDs to be included in the order.",
        example: [
            { id: "3fa85f64-5717-4562-b3fc-2c963f66afa6" },
            { id: "2c963f66-4562-5717-3fa8-b3fcf64afa63" }
        ],
        type: [ProductIdDto]
    })
    @IsNotEmpty()
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => ProductIdDto)
    products: ProductIdDto[]
};