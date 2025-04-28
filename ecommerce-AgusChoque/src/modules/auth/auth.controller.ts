import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/loginUser.dto';
import { CreateUserDto } from '../users/dtos/createUser.dto';
import { ApiBody, ApiExtraModels, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { bodySignInAuth, bodySignUpAuth, responseGetAuth, responseSignInAuth, responseSignUpAuth } from 'src/helpers/openApiAuth';
import { UserResponseDto } from '../users/dtos/userResponse.dto';

@ApiExtraModels(LoginUserDto, CreateUserDto)
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService) {};

    // OPEN API
    @ApiOperation({ summary: "Get an auth list." })
    @ApiResponse(responseGetAuth)
    // HTTP METHOD
    @HttpCode(200)
    @Get()
    // HANDLER
    async getAuth (): Promise<string> {
        return await this.authService.getAuthService();
    };

    // OPEN API
    @ApiOperation({ summary: "Sign up a new user." })
    @ApiResponse(responseSignUpAuth)
    @ApiBody(bodySignUpAuth)
    // HTTP METHOD
    @HttpCode(201)
    @Post("signup")
    // HANDLER
    async signUp (@Body() user: CreateUserDto): Promise<UserResponseDto> {
        return await this.authService.signUpService(user);
    }

    // OPEN API
    @ApiOperation({ summary: "Log in an existing user." })
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
