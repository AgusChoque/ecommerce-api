import { ApiBodyOptions, ApiParamOptions, ApiResponseOptions } from "@nestjs/swagger";
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
    type: CreateOrderDto
};