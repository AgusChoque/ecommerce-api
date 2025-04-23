import { Injectable } from '@nestjs/common';
import { Order } from './entities/Order.entity';
import { CreateOrderDto } from './dtos/createOrder.dto';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
    constructor (
        private readonly ordersRepository: OrdersRepository
    ) {};

    async getOrderService (id: string): Promise<Order> {
        return await this.ordersRepository.getOrderRepository(id);
    };

    async addOrderService (order: CreateOrderDto) {
        return await this.ordersRepository.addOrderRepository(order);
    };
}
