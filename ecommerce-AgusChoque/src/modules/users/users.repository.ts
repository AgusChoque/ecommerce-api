import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/User.entity";
import { Repository } from "typeorm";
import { UserDto } from "./dtos/user.dto";

@Injectable()
export class UsersRepository {
    constructor (
        @InjectRepository(User)
        private readonly usersDbRepository: Repository<User>
    ) {};

    async getUsersRepository (page: number, limit: number): Promise <Omit<User, 'password'>[]>  {
        const start = (page - 1) * limit;
        const end = start + limit;

        const users: User[] = (await this.usersDbRepository.find({relations: { orders: true }})).slice(start, end);
        if ( !users.length ) throw new NotFoundException("Users not found.");

        return users.map(({password, ...userWithoutPassword}) => userWithoutPassword);
    };

    async getUserRepository (id: string): Promise<Omit<User, 'password'>> {
        const user: User | null = await this.usersDbRepository.findOne({where: { id }, relations: { orders: true }});
        if ( !user ) throw new NotFoundException("User not found.");

        const {password, ...userWithoutPassword} = user;
        return userWithoutPassword;
    };

    async getUserByEmail (email: string): Promise <User | null> {
        const user: User | null = await this.usersDbRepository.findOneBy({email});
        return user;
    };

    async createUserRepository (user: UserDto): Promise<string> {
        const newUser: User = await this.usersDbRepository.create(user);
        await this.usersDbRepository.save(newUser);
        return newUser.id;
    };

    async updateUserRepository (id: string, user: UserDto): Promise<string> {
        await this.usersDbRepository.update(id, user);

        const userUpdated = await this.usersDbRepository.findOneBy({id});
        if( !userUpdated ) throw new NotFoundException('User not found.');

        return userUpdated.id;
    };

    async deleteUserRepository (id: string) {
        await this.usersDbRepository.delete(id);
        return id;
    };
}