import { ApiResponseOptions } from "@nestjs/swagger";
import { Category } from "../modules/categories/entities/Category.entity";

// GET "/categories"
// Response
export const responseGetCategories: ApiResponseOptions = {
    status:200,
    description: "Successfully retrieved the list of categories.",
    type: Category,
    isArray: true
};


// GET "/categories/seeder"+
// Response
export const responseGetSeederCategories: ApiResponseOptions = {
    status: 201,
    description: 'Successfully preloaded categories. A confirmation message is returned as a string.',
    type: String
};