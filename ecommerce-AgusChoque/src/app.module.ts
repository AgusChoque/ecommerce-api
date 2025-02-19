import { Module } from '@nestjs/common';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: ".env.development"
  }), 
  TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: "postgres",
      database: configService.get("DB_NAME"),
      host: configService.get("DB_HOST"),
      port: configService.get("DB_PORT"),
      username: configService.get("DB_USERNAME"),
      password: configService.get("DB_PASSWORD"),
      entities: [],
      synchronize: true,
    })
  })
    , ProductsModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
