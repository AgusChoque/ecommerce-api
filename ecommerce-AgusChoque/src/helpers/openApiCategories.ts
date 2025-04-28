import { ApiResponseOptions } from "@nestjs/swagger";
import { CategoriesResponseDto } from "src/modules/categories/dto/categoriesResponse.dto";

// GET "/categories"
// Response
export const responseGetCategories: ApiResponseOptions = {
    status:200,
    description: "Successfully retrieved the list of categories.",
    type: CategoriesResponseDto,
    isArray: true,
    example: [{
        "id": "c2a163f1-6b3a-4d63-9e7a-5c71855b53c7",
        "name": "Electronics"
    },
    {
        "id": "d4b7d0b2-712e-41d8-a9e3-2d9b0fbe3c62",
        "name": "Books"
    },
    {
        "id": "3e8a94cb-7cb1-4a7a-8c62-09b76814e236",
        "name": "Clothing"
    },
    {
        "id": "69a3f305-9e39-4ad7-87e4-9b04be9c772b",
        "name": "Furniture"
    },
    {
        "id": "08e6be70-03a9-4dc7-9609-4742bd2d841b",
        "name": "Toys"
    }]
};


// GET "/categories/seeder"+
// Response
export const responseGetSeederCategories: ApiResponseOptions = {
    status: 201,
    description: 'Successfully preloaded categories. A confirmation message is returned as a string.',
    schema: {
        type: "string",
        example: "All categories loaded."
    }
};