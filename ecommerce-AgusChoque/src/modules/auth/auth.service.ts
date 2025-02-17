import { Injectable } from '@nestjs/common';
import signinDto from 'src/dtos/signinDto.interface';
import { User } from '../users/entities/User.entity';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class AuthService {
    constructor(private usersRepository: UsersRepository) {}

    getAuth ():string {
        return "Auth.";
    };

    signin ({email, password}: signinDto):number {
        const user: User = this.usersRepository.findByEmail(email);
        if(!user) throw Error("Email or password incorrect.");
        else if (user.password !== password) throw Error("Email or password incorrect.");
        else return user.id;
    }
}
