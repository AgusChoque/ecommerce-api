import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserMiddleware } from 'src/middlewares/createUser.middleware';
import { UpdateUserMiddleware } from 'src/middlewares/updateUser.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(CreateUserMiddleware).forRoutes({ path: "users", method: RequestMethod.POST });
      consumer.apply(UpdateUserMiddleware).forRoutes({ path: "users/:id", method: RequestMethod.PUT });
  }
}
