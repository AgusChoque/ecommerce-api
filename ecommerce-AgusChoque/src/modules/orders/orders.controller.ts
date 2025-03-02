import { Controller, Get, HttpCode, Param, Post, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Request } from 'express';
import { Order } from './entities/Order.entity';

@Controller('orders')
export class OrdersController {
    constructor (private ordersService: OrdersService) {};

    @HttpCode(200)
    @Get(":id")
    async getOrderById (@Param("id") id: string): Promise<Order> {
        return await this.ordersService.getOrder(id);
    };
    
    @HttpCode(201)
    @Post()
    async createOrder (@Req() req: Request) {
        return await this.ordersService.addOrder(req.body);
    };

};
