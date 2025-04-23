import { BadRequestException, Injectable } from "@nestjs/common";
import { User } from "../users/entities/User.entity";
import { JwtService } from "@nestjs/jwt";
import { UserDto } from "../users/dtos/user.dto";
import { UsersRepository } from "../users/users.repository";
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from "./dtos/loginUser.dto";

@Injectable()
export class AuthRepository {
    constructor (
        private readonly usersRepository: UsersRepository,
        private jwtService: JwtService
    ) {};

    getAuthRepository ():string {
        return "Auth.";
    };

    async signUpRepository ({password, ...userToSignUp}: UserDto): Promise<Omit<User, "password">> {
        if ( password !== userToSignUp.passConfirmation ) throw new BadRequestException("Passwords must match.");

        const passHashed = await bcrypt.hash(password, 10);
        const id = await this.usersRepository.createUserRepository({ ...userToSignUp, password: passHashed });

        return await this.usersRepository.getUserRepository(id);
    };

    async signInRepository ({email, password}: LoginUserDto): Promise<string> {
        const user: User | null = await this.usersRepository.getUserByEmail(email);
        const isValidPass = await bcrypt.compare(password, user?.password);
        if ( !user || !isValidPass ) throw new BadRequestException("Email or password incorrect.");
        
        const userPayload = {
            sub: user.id,
            email: user.email
        };
        const token = await this.jwtService.signAsync(userPayload);

        return token;
    };
}