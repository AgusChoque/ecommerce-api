import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { User } from "../users/entities/User.entity";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "../users/dtos/createUser.dto";
import { UsersRepository } from "../users/users.repository";
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from "./dtos/loginUser.dto";
import { Role } from "src/role.enum";
import { JWT_SECRET } from "src/config/envs";

@Injectable()
export class AuthRepository {
    constructor (
        private readonly usersRepository: UsersRepository,
        private jwtService: JwtService
    ) {};

    getAuthRepository ():string {
        return "Data successfully retrieved.";
    };

    async signUpRepository ({password, ...userToSignUp}: CreateUserDto): Promise<Omit<User, "password" | "isAdmin">> {
        const user: User | null = await this.usersRepository.getUserByEmail(userToSignUp.email);
        if( user ) throw new ConflictException("An account with this email has already been created.");
        
        const passHashed = await bcrypt.hash(password, 10);
        if (!passHashed) throw new InternalServerErrorException("There was a problem hashing the password.");

        const id = await this.usersRepository.createUserRepository({ ...userToSignUp, password: passHashed });
        return await this.usersRepository.getUserRepository(id);
    };

    async signInRepository ({email, password}: LoginUserDto) {
        const user: User | null = await this.usersRepository.getUserByEmail(email);
        const isValidPass = await bcrypt.compare(password, user?.password);
        if ( !user || !isValidPass ) throw new BadRequestException("Email or password incorrect.");
        
        const userRole = user.isAdmin ? Role.Admin : Role.User;

        const userPayload = {
            sub: user.id,
            email: user.email,
            role: userRole
        };
        const token = await this.jwtService.signAsync(userPayload, {secret: JWT_SECRET});

        return {
            token,
            message: "Login successfully."
        };
    };
}