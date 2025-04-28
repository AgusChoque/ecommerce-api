import { OmitType } from "@nestjs/swagger";
import { Category } from "../entities/Category.entity";

export class CategoriesResponseDto extends OmitType( Category, ["products"] ) {}