import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/Order.entity';
import { OrderDetail } from './entities/OrderDetail.entity';
import { User } from '../users/entities/User.entity';
import { Product } from '../products/entities/Product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetail, User, Product])],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
