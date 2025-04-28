import { ApiBodyOptions, ApiParamOptions, ApiQueryOptions, ApiResponseOptions } from "@nestjs/swagger";
import { ProductDto } from "src/modules/products/dto/product.dto";
import { Product } from "src/modules/products/entities/Product.entity";

// GET "/products"
// Response
export const responseGetProducts: ApiResponseOptions = {
    status: 200,
    description: 'Successfully retrieved the list of products.',
    type: Product,
    isArray: true
};
// Query's
export const pageGetProduct: ApiQueryOptions = {
    name: "page",
    required: false,
    description: "Page number for paginated results. Defaults to 1 if not provided."
};
export const limitGetProduct: ApiQueryOptions = {
    name: "limit",
    required: false,
    description: "Maximum number of products to return per page. Defaults to 5 if not provided."
};


// GET "/products/{id}"
// Response
export const responseGetProduct: ApiResponseOptions = {
    status: 200,
    description: 'Successfully retrieved the product by ID.',
    type: Product
};
// Params
export const paramIdGetProduct: ApiParamOptions = {
    name: "id",
    description: "Unique identifier of the product to retrieve.",
    example: "5b2dae8b-f17c-48ca-bfc0-a7aed0883a44"
};


// GET "/products/seeder"
// Response
export const responseGetSeederProduct: ApiResponseOptions = {
    status: 201,
    description: 'Successfully preloaded products. A confirmation message is returned as a string.',
    type: String
};


// POST "/products/{id}"
// Response
export const responsePostProduct: ApiResponseOptions = {
    status: 201,
    description: 'Successfully created a product. The ID of the created product is returned as a string.',
    type: String,
};
// Body
export const bodyPostProduct: ApiBodyOptions = {
    description: "Data required to create a new product.",
    required: true,
    type: ProductDto
};


// PUT "/products/{id}"
// Response
export const responsePutProduct: ApiResponseOptions = {
    status: 200,
    description: "Successfully updated the product. The updated product ID is returned as a string.",
    type: String
};
// Params
export const paramIdPutProduct: ApiParamOptions = {
    name: "id",
    description: "Unique identifier of the product to update."
};
// Body
export const bodyPutProduct: ApiBodyOptions = {
    description: "Fields to update for the selected product.",
    required: true,
    type: ProductDto
};


// DELETE "/products/{id}"
// Response
export const responseDeleteProduct: ApiResponseOptions = {
    status: 200,
    description: "Successfully deleted the product. The deleted product ID is returned as a string.",
    type: String
};
// Params
export const paramIdDeleteProduct: ApiParamOptions = {
    name: "id",
    description: "Unique identifier of the product to delete."
};