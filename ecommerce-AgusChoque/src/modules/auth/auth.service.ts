import { Injectable } from '@nestjs/common';
import signinDto from 'src/dtos/signinDto.interface';
import { User } from '../users/entities/User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

    getAuth ():string {
        return "Auth.";
    };

    async signin ({email, password}: signinDto): Promise<string> {
        const user: User | null = await this.usersRepository.findOneBy({email});
        if(!user) throw Error("Email or password incorrect.");
        else if (user.password !== password) throw Error("Email or password incorrect.");
        else return user.id;
    }
}
