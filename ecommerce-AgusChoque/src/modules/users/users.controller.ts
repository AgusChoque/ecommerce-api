import { Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Req, SetMetadata, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/User.entity';
import { Request } from 'express';
import { AuthGuard } from '../auth/auth.guard';

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
    async getUserById (@Param("id") id: string):Promise<Omit<User, "password">>  {
        return await this.usersService.getUserById(id);
    };

    @SetMetadata("isPublic", true)
    @HttpCode(201)
    @Post()
    async createUser (@Req() req: Request): Promise<string> {
        return await this.usersService.createUser(req.body);
    };

    @HttpCode(200)
    @Put(":id")
    async updateUser (@Param("id") id: string, @Req() req: Request): Promise<string> {
        return await this.usersService.updateUser({id, newData: req.body});
    };

    @HttpCode(200)
    @Delete(":id")
    async deleteUser (@Param("id") id: string): Promise<string> {
        return await this.usersService.deleteUser(id);
    };
}
