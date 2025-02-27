import { Controller, Delete, Get, HttpCode, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/User.entity';
import { Request } from 'express';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {};

    @HttpCode(200)
    @Get()
    async getUsers ():Promise<Omit<User, "password">[]> {
        return await this.usersService.getAllUsers();
    };

    @HttpCode(200)
    @Get(":id")
    async getUserById (@Param("id") id: string):Promise<Omit<User, "password">>  {
        return await this.usersService.getUserById(id);
    };

    @HttpCode(201)
    @Post()
    @UseGuards()
    async createUser (@Req() req: Request): Promise<string> {
        return await this.usersService.createUser(req.body);
    };

    @HttpCode(200)
    @Put(":id")
    updateUser (@Param("id") id: string, @Req() req: Request): void {
        return this.usersService.updateUser({id:Number(id), newData: req.body});
    };

    @HttpCode(200)
    @Delete(":id")
    deleteUser (@Param("id") id: string): number {
        return this.usersService.deleteUser(Number(id))
    };
}
