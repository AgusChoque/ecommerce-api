import { PickType } from "@nestjs/swagger";
import { Product } from "src/modules/products/entities/Product.entity";

export class ProductIdDto extends PickType(Product, ["id"]){}