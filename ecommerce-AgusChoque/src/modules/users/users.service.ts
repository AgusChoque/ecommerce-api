import { Injectable } from '@nestjs/common';
import { User } from './entities/User.entity';
import { UserDto } from './dtos/user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async getUsersService (page: number, limit: number): Promise<Omit<User, "password">[]> {
        return await this.usersRepository.getUsersRepository(page, limit);
    };

    async getUserService (id: string): Promise<Omit<User, "password">> {
        return await this.usersRepository.getUserRepository(id);
    };

    async createUserService (user: UserDto): Promise<string> {
        return await this.usersRepository.createUserRepository(user);
    };

    async updateUserService (id: string, user: UserDto): Promise<string> {
        return await this.usersRepository.updateUserRepository(id, user);
    };

    async deleteUserService (id: string): Promise<string> {
        return await this.usersRepository.deleteUserRepository(id);
    };
};