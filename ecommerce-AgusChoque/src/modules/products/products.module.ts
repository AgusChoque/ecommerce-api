import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductMiddleware } from 'src/middlewares/createProduct.middleware';
import { UpdateProductMiddleware } from 'src/middlewares/updateProduct.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/Product.entity';
import { Category } from '../categories/entities/Category.entity';
import { ProductsRepository } from './products.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository]
})
export class ProductsModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CreateProductMiddleware).forRoutes({ path: "products", method: RequestMethod.POST });
    consumer.apply(UpdateProductMiddleware).forRoutes({ path: "products/:id", method: RequestMethod.PUT });
  }
}
