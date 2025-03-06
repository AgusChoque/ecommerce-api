import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/loginUser.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService) {};

    @Get()
    getAuth ():string {
        return this.authService.getAuth();
    };

    @Post("signin")
    signin (@Body() loginUserDto: LoginUserDto) {
        const id = this.authService.signin(loginUserDto);
        return {login: true, id};
    };
}
