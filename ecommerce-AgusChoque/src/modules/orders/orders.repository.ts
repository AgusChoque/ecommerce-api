import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./entities/Order.entity";
import { Repository } from "typeorm";
import { OrderDetail } from "./entities/OrderDetail.entity";
import { User } from "../users/entities/User.entity";
import { Product } from "../products/entities/Product.entity";
import { CreateOrderDto } from "./dtos/createOrder.dto";

@Injectable()
export class OrdersRepository {
    constructor (
        @InjectRepository(Order)
        private ordersDbRepository: Repository<Order>,
        @InjectRepository(OrderDetail)
        private orderDetailsDbRepository: Repository<OrderDetail>,
        @InjectRepository(User)
        private usersDbRepository: Repository<User>,
        @InjectRepository(Product)
        private productsDbRepository: Repository<Product>
    ) {};

    async getOrderRepository (id: string): Promise<Order> {
        const order: Order | null = await this.ordersDbRepository.findOne({
            where: { id },
            relations: {
                user: true,
                orderDetail: true
            }
        });
        if(!order) throw new NotFoundException("Order not found.");
        
        return order;
    };

    async addOrderRepository ({ userId, products }: CreateOrderDto) {
        const user: User | null = await this.usersDbRepository.findOneBy({id: userId});
        if( !user ) throw new NotFoundException("User not found.");

        const now = new Date();
        const day = now.getDate().toString().padStart(2, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const year = now.getFullYear();

        const order = new Order();
        order.date = `${day}/${month}/${year}`;
        order.user = user;

        await this.ordersDbRepository.save(order);

        let total: number = 0
        const elegibleProducts: Product[] = (await Promise.all(products.map(async (element) => {
            const product: Product | null = await this.productsDbRepository.findOneBy({ id: element.id });
            if( !product ) return;
            if ( product.stock < 1 ) return;

            total += Number(product.price);
            await this.productsDbRepository.update(
                {id: product.id},
                {stock: product.stock - 1}
            );

            return product;
        }))).filter(element => element !== undefined);

        const orderDetail = new OrderDetail();
        orderDetail.price = Number(Number(total).toFixed(2));
        orderDetail.products = elegibleProducts;
        orderDetail.order = order;

        await this.orderDetailsDbRepository.save(orderDetail);

        return await this.ordersDbRepository.findOne({
            where: { id: order.id },
            relations: {
                orderDetail: true
            }
        });
    };
};