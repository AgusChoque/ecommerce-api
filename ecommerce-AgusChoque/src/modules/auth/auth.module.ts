import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersRepository } from '../users/users.repository';
import { SigninMiddleware } from 'src/middlewares/signin.middleware';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersRepository]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(SigninMiddleware).forRoutes({ path: "auth/signin", method: RequestMethod.POST });
  }
}
