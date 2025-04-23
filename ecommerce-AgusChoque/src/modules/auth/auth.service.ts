import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { LoginUserDto } from './dtos/loginUser.dto';
import { UserDto } from '../users/dtos/user.dto';

@Injectable()
export class AuthService {
    constructor(private readonly authRepository: AuthRepository) {};

    getAuthService () {
        return this.authRepository.getAuthRepository();
    };

    async signUpService (user: UserDto) {
        return await this.authRepository.signUpRepository(user);
    };

    async signInService (credentials: LoginUserDto) {
        return await this.authRepository.signInRepository(credentials);
    };
};
