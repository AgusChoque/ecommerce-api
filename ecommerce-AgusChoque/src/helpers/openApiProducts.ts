import { ApiBodyOptions, ApiParamOptions, ApiQueryOptions, ApiResponseOptions, getSchemaPath } from "@nestjs/swagger";
import { ProductDto } from "src/modules/products/dto/product.dto";
import { ProductResponseDto } from "src/modules/products/dto/productResponse.dto";

// GET "/products"
// Response
export const responseGetProducts: ApiResponseOptions = {
    status: 200,
    description: 'Successfully retrieved the list of products.',
    type: ProductResponseDto,
    isArray: true,
    example: [
        {
            "id": "7b9f1b46-0d50-4f6e-bc21-8a9b4b122d52",
            "name": "Wireless Mouse",
            "description": "Ergonomic wireless mouse with adjustable DPI.",
            "price": "29.99",
            "stock": 150,
            "imgUrl": "https://res.cloudinary.com/dcuqpgmi5/image/upload/v1745813141/b0nxokfccuaqcvsnudqs.png",
            "category": {
              "id": "3e6e9c1e-b1a3-48b0-8e20-25f0e04c8fc7",
              "name": "Electronics"
            }
          },
          {
            "id": "d6d1ef3d-b1fb-45e6-b9f7-5e1e2c295d23",
            "name": "Leather Wallet",
            "description": "Genuine leather wallet with multiple compartments.",
            "price": "45.50",
            "stock": 85,
            "imgUrl": "https://res.cloudinary.com/dcuqpgmi5/image/upload/v1745813141/b0nxokfccuaqcvsnudqs.png",
            "category": {
              "id": "8f705ae5-86cb-43c6-899d-51c981ff0d56",
              "name": "Accessories"
            }
          },
          {
            "id": "1fc16d69-c0d3-4f7f-9335-31f3b94d8cf7",
            "name": "Yoga Mat",
            "description": "Eco-friendly yoga mat made from recycled materials.",
            "price": "22.00",
            "stock": 60,
            "imgUrl": "https://res.cloudinary.com/dcuqpgmi5/image/upload/v1745813141/b0nxokfccuaqcvsnudqs.png",
            "category": {
              "id": "f9a1e3cb-5f55-4bb7-b7f8-8c3e0c7313f0",
              "name": "Fitness"
            }
          },
          {
            "id": "13fd2aef-6c7a-47c2-8fb8-51473d8900e4",
            "name": "Bluetooth Speaker",
            "description": "Portable Bluetooth speaker with powerful bass and long battery life.",
            "price": "89.90",
            "stock": 40,
            "imgUrl": "https://res.cloudinary.com/dcuqpgmi5/image/upload/v1745813141/b0nxokfccuaqcvsnudqs.png",
            "category": {
              "id": "bcaee3f5-d7c9-44af-9338-d7ad17058219",
              "name": "Electronics"
            }
          },
          {
            "id": "6f5ebba5-0c7e-4e6f-a3c5-4ac2ed8e3d01",
            "name": "Ceramic Mug",
            "description": "Handmade ceramic mug ideal for coffee or tea.",
            "price": "15.75",
            "stock": 200,
            "imgUrl": "https://res.cloudinary.com/dcuqpgmi5/image/upload/v1745813141/b0nxokfccuaqcvsnudqs.png",
            "category": {
              "id": "292c0634-fb1d-4aa1-83d8-bd59e3b7ec61",
              "name": "Home & Kitchen"
            }
          }
    ]
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
    schema: {
        oneOf: [{ $ref: getSchemaPath(ProductResponseDto) }]
    },
    example: {
        "id": "7b9f1b46-0d50-4f6e-bc21-8a9b4b122d52",
        "name": "Wireless Mouse",
        "description": "Ergonomic wireless mouse with adjustable DPI.",
        "price": "29.99",
        "stock": 150,
        "imgUrl": "https://res.cloudinary.com/dcuqpgmi5/image/upload/v1745813141/b0nxokfccuaqcvsnudqs.png",
        "category": {
            "id": "3e6e9c1e-b1a3-48b0-8e20-25f0e04c8fc7",
            "name": "Electronics"
        }
    }
};
// Params
export const paramIdGetProduct: ApiParamOptions = {
    name: "id",
    description: "Unique identifier of the product to retrieve.",
    example: "6e1792c2-fdb3-49bb-a44c-91fa2b08d589"
};


// GET "/products/seeder"
// Response
export const responseGetSeederProduct: ApiResponseOptions = {
    status: 201,
    description: 'Successfully preloaded products. A confirmation message is returned as a string.',
    schema: {
        type: "string",
        example: "All products loaded."
    }
};


// POST "/products/{id}"
// Response
export const responsePostProduct: ApiResponseOptions = {
    status: 201,
    description: 'Successfully created a product. The ID of the created product is returned as a string.',
    schema: {
        type: "string",
        example: "d6d1ef3d-b1fb-45e6-b9f7-5e1e2c295d23"
    }
};
// Body
export const bodyPostProduct: ApiBodyOptions = {
    description: "Data required to create a new product.",
    required: true,
    schema: {
        oneOf: [{ $ref: getSchemaPath(ProductDto) }],
    },
    examples: {
        "Smartphone ZX12": {
            summary: "Smartphone ZX12",
            value: {
              name: "Smartphone ZX12",
              description: "Powerful smartphone with a 6.7-inch AMOLED display, triple camera system, and 128GB of storage.",
              price: "649.99",
              stock: 85,
              imgUrl: "https://res.cloudinary.com/dcuqpgmi5/image/upload/v1746024500/sample-phone-image.webp",
              category: "413736ea-0189-46ed-a3f1-40aeda174a39",
            }
        },
        "Gaming Mouse": {
            summary: "Gaming Mouse",
            value: {
              name: "Gaming Mouse",
              description: "Ergonomic gaming mouse with customizable RGB lighting.",
              price: "59.99",
              stock: 80,
              category: "554e0f45-a088-4148-a2d6-389eaa2fd575",
            },
        },
        "Mechanical Keyboard": {
            summary: "Mechanical Keyboard",
            value: {
              name: "Mechanical Keyboard",
              description: "Compact mechanical keyboard with customizable keys and RGB backlight.",
              price: "129.99",
              stock: 65,
              category: "72210a6f-b0b8-4164-a4d1-12781d142bbe",
            },
        }
    }
};


// PUT "/products/{id}"
// Response
export const responsePutProduct: ApiResponseOptions = {
    status: 200,
    description: "Successfully updated the product. The updated product ID is returned as a string.",
    schema: {
        type: "string",
        example: "1fc16d69-c0d3-4f7f-9335-31f3b94d8cf7"
    }
};
// Params
export const paramIdPutProduct: ApiParamOptions = {
    name: "id",
    description: "Unique identifier of the product to update.",
};
// Body
export const bodyPutProduct: ApiBodyOptions = {
    description: "Fields to update for the selected product.",
    required: true,
    schema: {
        oneOf: [{ $ref: getSchemaPath(ProductDto) }],
    },
    examples: {
        "Update Stock for Smartphone ZX12": {
            summary: "Update stock for Smartphone ZX12",
            value: {
              name: "Smartphone ZX12",
              description: "Powerful smartphone with a 6.7-inch AMOLED display, triple camera system, and 128GB of storage.",
              price: "649.99",
              stock: 120,
              category: "413736ea-0189-46ed-a3f1-40aeda174a39",
            },
          },
          "Update Description for Gaming Mouse": {
            summary: "Update description for Gaming Mouse",
            value: {
              name: "Gaming Mouse",
              description: "Improved ergonomic design with customizable DPI and side buttons.",
              price: "59.99",
              stock: 75,
              category: "554e0f45-a088-4148-a2d6-389eaa2fd575",
            },
          },
          "Update Price for Mechanical Keyboard": {
            summary: "Update price for Mechanical Keyboard",
            value: {
              name: "Mechanical Keyboard",
              description: "Compact mechanical keyboard with customizable keys and RGB backlight.",
              price: "109.99",
              stock: 60,
              category: "72210a6f-b0b8-4164-a4d1-12781d142bbe",
            },
          },
    }
};


// DELETE "/products/{id}"
// Response
export const responseDeleteProduct: ApiResponseOptions = {
    status: 200,
    description: "Successfully deleted the product. The deleted product ID is returned as a string.",
    schema: {
        type: "string",
        example: "13fd2aef-6c7a-47c2-8fb8-51473d8900e4"
    }
};
// Params
export const paramIdDeleteProduct: ApiParamOptions = {
    name: "id",
    description: "Unique identifier of the product to delete.",
    example: "f9138f67-848a-43a3-81fe-4e7f85bded9a"
};