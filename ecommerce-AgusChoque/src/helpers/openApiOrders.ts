import { ApiBodyOptions, ApiParamOptions, ApiResponseOptions, getSchemaPath } from "@nestjs/swagger";
import { CreateOrderDto } from "src/modules/orders/dtos/createOrder.dto";
import { Order } from "src/modules/orders/entities/Order.entity";

// GET "/orders/{id}"
// Response
export const responseGetOrder: ApiResponseOptions = {
    status: 200,
    description: "Successfully retrieved the order by ID.",
    type: Order
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
    type: Order
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