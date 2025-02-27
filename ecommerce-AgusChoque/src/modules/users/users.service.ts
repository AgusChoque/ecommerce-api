import { Injectable } from '@nestjs/common';
import { User } from './entities/User.entity';
import updateUserDto from 'src/dtos/updateUserDto.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

    async getAllUsers (): Promise<Omit<User, "password">[]> {
        const users: Omit<User, "password">[] = await this.usersRepository.find()
        return users.map((user: User) => {return {...user, password: undefined}});;
    };

    async getUserById(id: string): Promise<Omit<User, "password">> {
        const user: User | null = await this.usersRepository.findOneBy({id});
        if ( user ) {
            const newUser = {...user, password: undefined};
            return newUser;
        } else {
            throw new Error("User don't found.");
        }
    };

    async createUser(user: Omit<User, "id">): Promise<string> {
        const newUser: User = await this.usersRepository.create(user);
        this.usersRepository.save(newUser);
        return newUser.id;
    };

    updateUser({id, newData}: updateUserDto): void {

    };

    deleteUser(id: number): number {
        this.usersRepository.delete(id);
        return id;
    };
}
