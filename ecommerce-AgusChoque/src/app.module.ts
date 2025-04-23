import { Module } from '@nestjs/common';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './modules/categories/categories.module';
import { OrdersModule } from './modules/orders/orders.module';
import { FilesModule } from './modules/files/files.module';
import typeorm from './config/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from './config/envs';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [typeorm]
  }), 
  TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => configService.get("typeorm")!,
  }),
  JwtModule.register({
    global: true,
    signOptions: { expiresIn: "1h" },
    secret: JWT_SECRET
  })
    , ProductsModule, UsersModule, AuthModule, CategoriesModule, OrdersModule, FilesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
