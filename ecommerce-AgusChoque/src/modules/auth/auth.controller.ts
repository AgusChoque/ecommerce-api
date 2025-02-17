import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import signinDto from 'src/dtos/signinDto.interface';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService) {};

    @Get()
    getAuth ():string {
        return this.authService.getAuth();
    };

    @Post("signin")
    signin (@Body() signinDto: signinDto) {
        const id = this.authService.signin(signinDto);
        return {login: true, id};
    };
}
