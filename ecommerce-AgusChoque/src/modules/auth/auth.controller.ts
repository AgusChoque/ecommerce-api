import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/loginUser.dto';
import { User } from '../users/entities/User.entity';
import { CreateUserDto } from '../users/dtos/createUser.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService) {};

    @HttpCode(200)
    @Get()
    async getAuth (): Promise<string> {
        return await this.authService.getAuthService();
    };

    @HttpCode(201)
    @Post("signup")
    async signUp (@Body() user: CreateUserDto): Promise<Omit<User, "password" | "isAdmin">> {
        return await this.authService.signUpService(user);
    }

    @HttpCode(200)
    @Post("signin")
    async signIn (@Body() credentials: LoginUserDto) {
        return await this.authService.signInService(credentials);
    };
}
