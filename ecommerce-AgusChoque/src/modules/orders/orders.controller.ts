import { Body, Controller, Get, HttpCode, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dtos/createOrder.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiBearerAuth, ApiBody, ApiExtraModels, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { bodyPostOrder, paramIdGetOrder, responseGetOrder, responsePostOrder } from 'src/helpers/openApiOrders';
import { CreateOrderResponseDto, GetOrderResponseDto } from './dtos/OrderResponses.dto';
import { OwnUserGuard } from '../auth/guards/ownUser.guard';

@ApiExtraModels(CreateOrderDto)
@ApiTags('Orders')
@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
    constructor (private ordersService: OrdersService) {};

    // OPEN API
    @ApiOperation({ summary: "Get a purchase order by ID." })
    @ApiResponse(responseGetOrder)
    @ApiParam(paramIdGetOrder)
    // AUTH
    @UseGuards(AuthGuard)
    // HTTP CODE
    @HttpCode(200)
    @Get(":id")
    // HANDLER
    async getOrderById (@Param("id", ParseUUIDPipe) id: string): Promise<GetOrderResponseDto> {
        return await this.ordersService.getOrderService(id);
    };
    
    // OPEN API
    @ApiOperation({ summary: "Create a purchase order." })
    @ApiResponse(responsePostOrder)
    @ApiBody(bodyPostOrder)
    // AUTH
    @UseGuards(AuthGuard, OwnUserGuard)
    // HTTP CODE
    @HttpCode(201)
    @Post()
    // HANDLER
    async createOrder (@Body() order: CreateOrderDto): Promise<CreateOrderResponseDto> {
        return await this.ordersService.addOrderService(order);
    };

};
