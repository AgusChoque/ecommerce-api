import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './entities/User.entity';
import updateUserDto from 'src/dtos/updateUserDto.interface';

@Injectable()
export class UsersService {
    constructor(private usersRepository: UsersRepository) {}

    getAllUsers (): Omit<User, "password">[] {
        const users: Omit<User, "password">[] = this.usersRepository.find().map((user: User) => {return {...user, password: undefined}});
        return users;
    };

    getUserById(id: number): Omit<User, "password"> {
        const user: User = this.usersRepository.findById(id);
        const newUser = {...user, password: undefined};
        return newUser;
    };

    createUser(user: Omit<User, "id">): number {
        const newUser: User = this.usersRepository.create(user);
        this.usersRepository.save(newUser);
        return newUser.id;
    };

    updateUser({id, newData}: updateUserDto): number {
        let user = this.usersRepository.findById(id);
        user = {...user, ...newData};
        this.usersRepository.save(user);
        return id;
    };

    deleteUser(id: number): number {
        this.usersRepository.delete(id);
        return id;
    };
}
