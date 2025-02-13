import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './entities/User.entity';

@Injectable()
export class UsersService {
    constructor(private usersRepository: UsersRepository) {}

    getAllUsers ():User[] {
        return this.usersRepository.getAllUsers();
    };
}
