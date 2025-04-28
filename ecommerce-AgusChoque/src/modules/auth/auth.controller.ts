import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/loginUser.dto';
import { User } from '../users/entities/User.entity';
import { CreateUserDto } from '../users/dtos/createUser.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { bodySignInAuth, bodySignUpAuth, responseGetAuth, responseSignInAuth, responseSignUpAuth } from 'src/helpers/openApiAuth';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService) {};

    // OPEN API
    @ApiResponse(responseGetAuth)
    // HTTP METHOD
    @HttpCode(200)
    @Get()
    // HANDLER
    async getAuth (): Promise<string> {
        return await this.authService.getAuthService();
    };

    // OPEN API
    @ApiResponse(responseSignUpAuth)
    @ApiBody(bodySignUpAuth)
    // HTTP METHOD
    @HttpCode(201)
    @Post("signup")
    // HANDLER
    async signUp (@Body() user: CreateUserDto): Promise<Omit<User, "password" | "isAdmin">> {
        return await this.authService.signUpService(user);
    }

    // OPEN API
    @ApiResponse(responseSignInAuth)
    @ApiBody(bodySignInAuth)
    // HTTP METHOD
    @HttpCode(200)
    @Post("signin")
    // HANDLER
    async signIn (@Body() credentials: LoginUserDto) {
        return await this.authService.signInService(credentials);
    };
}
