import { ApiBodyOptions, ApiParamOptions, ApiResponseOptions, getSchemaPath } from "@nestjs/swagger";
import { CreateOrderDto } from "src/modules/orders/dtos/createOrder.dto";
import { CreateOrderResponseDto, GetOrderResponseDto } from "src/modules/orders/dtos/OrderResponses.dto";

// GET "/orders/{id}"
// Response
export const responseGetOrder: ApiResponseOptions = {
    status: 200,
    description: "Successfully retrieved the order by ID.",
    type: GetOrderResponseDto,
    example: {
        "id": "ad1a5b43-2f58-496b-8209-8699f8f409df",
        "date": "28/04/2025",
        "orderDetail": {
            "id": "cfe37b6b-4a33-419e-b49f-65140bb3c0f0",
            "price": "329.98",
            "products": [{
                "id": "2e4d1c56-f83c-41f2-8a84-8fa128c45d63",
                "name": "Wireless Headphones",
                "description": "Noise-canceling over-ear headphones with Bluetooth connectivity.",
                "price": "199.99",
                "stock": 50,
                "imgUrl": "https://res.cloudinary.com/dcuqpgmi5/image/upload/v1745813141/b0nxokfccuaqcvsnudqs.png",
                "category": {
                    "id": "c2a163f1-6b3a-4d63-9e7a-5c71855b53c7",
                    "name": "Electronics"
                }
            },{
                "id": "d4b7d0b2-712e-41d8-a9e3-2d9b0fbe3c62",
                "name": "Laptop Stand",
                "description": "Adjustable laptop stand for ergonomic use.",
                "price": "129.99",
                "stock": 30,
                "imgUrl": "https://res.cloudinary.com/dcuqpgmi5/image/upload/v1745813141/b0nxokfccuaqcvsnudqs.png",
                "category": {
                    "id": "d4b7d0b2-712e-41d8-a9e3-2d9b0fbe3c62",
                    "name": "Electronics"
                }
            }]
        }
    }
};
// Params
export const paramIdGetOrder: ApiParamOptions = {
    name: "id",
    description: "Unique identifier of the order to retrieve."
};


// POST "/orders/{id}"
// Response
export const responsePostOrder: ApiResponseOptions = {
    status: 201,
    description: "Successfully created an order. The order and order details are returned.",
    type: CreateOrderResponseDto,
    example: {
        "id": "dbb2f693-8105-4c06-8fa5-593f62d3288b",
        "date": "28/04/2025",
        "orderDetail": {
            "id": "7bc4e3d4-033d-46b4-b5b9-1be632a62e6b",
            "price": "199.99"
        }
    }
};
// Body
export const bodyPostOrder: ApiBodyOptions = {
    description: "Data required to create a new order.",
    required: true,
    schema: {
        oneOf: [{ $ref: getSchemaPath(CreateOrderDto) }]
    },
    examples: {
        "Order for John Doe": {
            summary: "Order for John Doe",
            value: {
                userId: "59bfa3ab-a739-464e-a8d9-6d22201be6f0",
                products: [{
                    id: "28f582e1-22ac-4912-9f15-9527a273d0a4"
                }, {
                    id: "bee8b7a4-532c-4dd7-8b27-34280803ed70"
                }, {
                    id: "7cdfc7fd-d998-4adc-a900-e1226d408c26"
                }]
            }
        },
        "Order for Alice Smith": {
            summary: "Order for Alice Smith",
            value: {
                userId: "3d6e0cdb-e5a2-4873-bf29-faa0365746ab",
                products: [{
                    id: "621a467d-2511-4494-a9f9-045487d7767c"
                }, {
                    id: "98396f1e-09b2-43be-9ff7-7c60d3485f33"
                }]
            }
        },
        "Order for Charlie Brown": {
            summary: "Order for Charlie Brown",
            value: {
                userId: "9188881d-1754-4070-9c80-7e7218987e3d",
                products: [{
                    id: "28f582e1-22ac-4912-9f15-9527a273d0a4"
                }, {
                    id: "bee8b7a4-532c-4dd7-8b27-34280803ed70"
                }, {
                    id: "621a467d-2511-4494-a9f9-045487d7767c"
                }, {
                    id: "98396f1e-09b2-43be-9ff7-7c60d3485f33"
                }]
            }
        },
    }
};