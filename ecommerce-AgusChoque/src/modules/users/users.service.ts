import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

    async getAllUsers (page: number, limit: number): Promise<Omit<User, "password">[]> {
        const start = (page - 1) * limit;
        const end = start + limit;

        const users: User[] = (await this.usersRepository.find({relations: { orders: true }})).slice(start, end);
        if ( !users.length ) throw new NotFoundException("Users not found.");

        return users.map(user => { return {...user, password: undefined} });
    };

    async getUserById(id: string): Promise<Omit<User, "password">> {
        const user: User | null = await this.usersRepository.findOne({where: { id }, relations: { orders: true }});
        if ( !user ) {
            throw new NotFoundException("User not found.");
        }
        const newUser = {...user, password: undefined};
        return newUser;
    };

    async createUser(user: CreateUserDto): Promise<string> {
        try {
            const newUser: User = await this.usersRepository.create(user);
            this.usersRepository.save(newUser);
            return newUser.id;
        } catch (e) {
            throw new HttpException(
                {
                    status: 500,
                    error: "Error saving the user to the database."
                },
                500
            );
        };
    };

    async updateUser({id, newData}: UpdateUserDto): Promise<string> {
        let user: User | null = await this.usersRepository.findOneBy({id});
        if( !user ) {
            throw new NotFoundException("User not found.");
        };

        user = {...user, ...newData};
        await this.usersRepository.save(user);

        return user.id;
    };

    async deleteUser(id: string): Promise<string> {
        await this.usersRepository.delete(id);
        return id;
    };
};