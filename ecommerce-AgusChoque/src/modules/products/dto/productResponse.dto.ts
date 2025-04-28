import { ApiProperty, OmitType } from "@nestjs/swagger";
import { Product } from "../entities/Product.entity";
import { CategoriesResponseDto } from "src/modules/categories/dto/categoriesResponse.dto";

export class ProductResponseDto extends OmitType( Product, ["orderDetails", "category"] ) {
    @ApiProperty({
        description: "Category of the product."
    })
    category: CategoriesResponseDto
}