import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/Order.entity';
import { Repository } from 'typeorm';
import { OrderDetail } from './entities/OrderDetail.entity';
import { addOrderDto } from './dto/addOrderDto';
import { User } from '../users/entities/User.entity';
import { Product } from '../products/entities/Product.entity';
import { elementAt } from 'rxjs';

@Injectable()
export class OrdersService {
    constructor (
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,
        @InjectRepository(OrderDetail)
        private orderDetailsRepository: Repository<OrderDetail>,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(Product)
        private productsRepository: Repository<Product>
    ) {};

    async getOrder (id: string): Promise<Order> {
        const order: Order | null = await this.ordersRepository.findOne({
            where: { id },
            relations: {
                user: true,
                orderDetail: true
            }
        });
        if(!order) throw new Error("Order doesn't found.");
        
        return order;
    };

    async addOrder ({userId, products}: addOrderDto) {
        const user: User | null = await this.usersRepository.findOneBy({id: userId});
        if( !user ) throw new Error("User not found.");

        const now = new Date();
        const order = new Order();
        order.date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
        order.user = user;

        const newOrder = await this.ordersRepository.save(order);

        let total: number = 0
        const productsArray: (Product | undefined)[] = await Promise.all(products.map(async (element) => {
            const product: Product | null = await this.productsRepository.findOneBy({ id: element.id });
            if( !product ) return;
            if ( product.stock < 1 ) return;

            total += Number(product.price);
            await this.productsRepository.update(
                {id: product.id},
                {stock: product.stock - 1}
            );

            return product;
        }));
        const uniqueProducts: Product[] = productsArray.filter(element => element !== undefined);

        const orderDetail = new OrderDetail();
        orderDetail.price = Number(Number(total).toFixed(2));
        orderDetail.products = uniqueProducts;
        orderDetail.order = newOrder;

        await this.orderDetailsRepository.save(orderDetail);

        return await this.ordersRepository.findOne({
            where: { id: order.id },
            relations: {
                orderDetail: true
            }
        })

    };
}
