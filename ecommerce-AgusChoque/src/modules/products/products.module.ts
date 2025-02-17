import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { CreateProductMiddleware } from 'src/middlewares/createProduct.middleware';
import { UpdateProductMiddleware } from 'src/middlewares/updateProduct.middleware';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository]
})
export class ProductsModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CreateProductMiddleware).forRoutes({ path: "products", method: RequestMethod.POST });
    consumer.apply(UpdateProductMiddleware).forRoutes({ path: "products/:id", method: RequestMethod.PUT });
  }
}
