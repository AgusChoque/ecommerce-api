import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, Query, SetMetadata, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/User.entity';
import { AuthGuard } from '../auth/auth.guard';
import { CreateUserDto } from './dtos/createUser.dto';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {};

    @HttpCode(200)
    @Get()
    async getUsers (@Query("page") page: string = "1", @Query("limit") limit: string = "5"):Promise<Omit<User, "password">[]> {
        return await this.usersService.getAllUsers(Number(page), Number(limit));
    };

    @HttpCode(200)
    @Get(":id")
    async getUserById (@Param("id", ParseUUIDPipe) id: string): Promise<Omit<User, "password">> {
        return await this.usersService.getUserById(id);
    };

    @SetMetadata("isPublic", true)
    @HttpCode(201)
    @Post()
    async createUser (@Body() createUserDto: CreateUserDto): Promise<string> {
        return await this.usersService.createUser(createUserDto);
    };

    @HttpCode(200)
    @Put(":id")
    async updateUser (@Param("id", ParseUUIDPipe) id: string, @Body() newData: CreateUserDto): Promise<string> {
        return await this.usersService.updateUser({id, newData});
    };

    @HttpCode(200)
    @Delete(":id")
    async deleteUser (@Param("id", ParseUUIDPipe) id: string): Promise<string> {
        return await this.usersService.deleteUser(id);
    };
}
