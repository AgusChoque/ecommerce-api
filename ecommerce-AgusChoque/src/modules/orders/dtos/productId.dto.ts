import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class ProductIdDto {
    @ApiProperty({
        description: "Unique identifier (UUID) of the product."
    })
    @IsUUID()
    id: string
}