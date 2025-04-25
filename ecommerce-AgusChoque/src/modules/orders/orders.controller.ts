import { Body, Controller, Get, HttpCode, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './entities/Order.entity';
import { CreateOrderDto } from './dtos/createOrder.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('orders')
export class OrdersController {
    constructor (private ordersService: OrdersService) {};

    @HttpCode(200)
    @Get(":id")
    async getOrderById (@Param("id", ParseUUIDPipe) id: string): Promise<Order> {
        return await this.ordersService.getOrderService(id);
    };
    
    @HttpCode(201)
    @Post()
    async createOrder (@Body() order: CreateOrderDto) {
        return await this.ordersService.addOrderService(order);
    };

};
