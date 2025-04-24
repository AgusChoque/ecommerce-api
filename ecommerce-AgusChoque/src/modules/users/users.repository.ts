import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/User.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dtos/createUser.dto";
import * as bcrypt from "bcrypt";

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

    async createUserRepository ({ passwordConfirm, ...user}: CreateUserDto): Promise<string> {
        const newUser: User = await this.usersDbRepository.create(user);
        await this.usersDbRepository.save(newUser);
        return newUser.id;
    };

    async updateUserRepository (id: string, {passwordConfirm, password, ...user}: CreateUserDto): Promise<string> {
        const passHashed = await bcrypt.hash(password, 10);
        if( !passHashed ) throw new InternalServerErrorException("There was a problem hashing the password.");

        await this.usersDbRepository.update(id, {...user, password: passHashed});

        const userUpdated = await this.usersDbRepository.findOneBy({id});
        if( !userUpdated ) throw new NotFoundException('User not found.');

        return userUpdated.id;
    };

    async deleteUserRepository (id: string) {
        await this.usersDbRepository.delete(id);
        return id;
    };
}