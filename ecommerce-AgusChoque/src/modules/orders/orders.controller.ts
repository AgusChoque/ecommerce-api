import { Body, Controller, Get, HttpCode, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './entities/Order.entity';
import { CreateOrderDto } from './dtos/createOrder.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { bodyPostOrder, paramIdGetOrder, responseGetOrder, responsePostOrder } from 'src/helpers/openApiOrders';

@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('orders')
export class OrdersController {
    constructor (private ordersService: OrdersService) {};

    // OPEN API
    @ApiResponse(responseGetOrder)
    @ApiParam(paramIdGetOrder)
    // HTTP CODE
    @HttpCode(200)
    @Get(":id")
    // HANDLER
    async getOrderById (@Param("id", ParseUUIDPipe) id: string): Promise<Order> {
        return await this.ordersService.getOrderService(id);
    };
    
    // OPEN API
    @ApiResponse(responsePostOrder)
    @ApiBody(bodyPostOrder)
    // HTTP CODE
    @HttpCode(201)
    @Post()
    // HANDLER
    async createOrder (@Body() order: CreateOrderDto): Promise<Order> {
        return await this.ordersService.addOrderService(order);
    };

};
