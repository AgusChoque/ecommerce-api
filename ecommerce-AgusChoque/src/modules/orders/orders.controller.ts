import { Body, Controller, Get, HttpCode, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './entities/Order.entity';
import { CreateOrderDto } from './dtos/createOrder.dto';

@Controller('orders')
export class OrdersController {
    constructor (private ordersService: OrdersService) {};

    @HttpCode(200)
    @Get(":id")
    async getOrderById (@Param("id", ParseUUIDPipe) id: string): Promise<Order> {
        return await this.ordersService.getOrder(id);
    };
    
    @HttpCode(201)
    @Post()
    async createOrder (@Body() createOrderDto: CreateOrderDto) {
        return await this.ordersService.addOrder(createOrderDto);
    };

};
