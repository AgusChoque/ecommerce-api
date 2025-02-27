import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductMiddleware } from 'src/middlewares/createProduct.middleware';
import { UpdateProductMiddleware } from 'src/middlewares/updateProduct.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/Product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CreateProductMiddleware).forRoutes({ path: "products", method: RequestMethod.POST });
    consumer.apply(UpdateProductMiddleware).forRoutes({ path: "products/:id", method: RequestMethod.PUT });
  }
}
