import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SigninMiddleware } from 'src/middlewares/signin.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(SigninMiddleware).forRoutes({ path: "auth/signin", method: RequestMethod.POST });
  }
}
