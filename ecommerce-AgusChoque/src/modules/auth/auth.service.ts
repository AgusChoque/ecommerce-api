import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dtos/loginUser.dto';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

    getAuth ():string {
        return "Auth.";
    };

    async signin ({email, password}: LoginUserDto): Promise<string> {
        const user: User | null = await this.usersRepository.findOneBy({email});
        if(!user) throw Error("Email or password incorrect.");
        else if (user.password !== password) throw Error("Email or password incorrect.");
        else return user.id;
    }
}
