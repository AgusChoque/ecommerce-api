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
    description: "Unique identifier of the order to retrieve.",
    example: "ca716a97-c579-412d-a94c-e0426a750db4"
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
        "Order for Maria Lopez": {
            summary: "Order for Maria Lopez",
            value: {
                userId: "41e360d3-d50f-4f73-97e0-531e91e33aa2",
                products: [{
                    id: "cfedaa9f-fce5-435d-8385-b4a935c3566c"
                }, {
                    id: "09ab699d-8acb-4a38-b9d1-aaa686b18435"
                }, {
                    id: "0f419499-7d1d-478c-82fd-2b36332fbaf1"
                }]
            }
        },
        "Order for Li Wei": {
            summary: "Order for Li Wei",
            value: {
                userId: "88be4436-569c-47e5-aca0-8a8b12fb4bd4",
                products: [{
                    id: "fdfaad8b-71d8-43e0-8c42-2bb8ec68f860"
                }, {
                    id: "cfedaa9f-fce5-435d-8385-b4a935c3566c"
                }]
            }
        },
        "Order for Marcus Reyes": {
            summary: "Order for Marcus Reyes",
            value: {
                userId: "85e0881d-bca4-4d2a-a3ef-4dc563fd016d",
                products: [{
                    id: "0f419499-7d1d-478c-82fd-2b36332fbaf1"
                }, {
                    id: "09ab699d-8acb-4a38-b9d1-aaa686b18435"
                }, {
                    id: "105129b6-ca39-44c5-be7f-3c58c466d9b7"
                }, {
                    id: "45d30a37-976a-4bbc-ae3d-092079779311"
                }]
            }
        },
    }
};