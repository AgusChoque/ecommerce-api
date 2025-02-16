import { Controller, Delete, Get, HttpCode, Param, Post, Put, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/User.entity';
import { Request } from 'express';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {};

    @HttpCode(200)
    @Get()
    getUsers ():Omit<User, "password">[] {
        return this.usersService.getAllUsers();
    };

    @HttpCode(200)
    @Get(":id")
    getUserById (@Param("id") id: string):Omit<User, "password">  {
        return this.usersService.getUserById(Number(id));
    };

    @HttpCode(201)
    @Post()
    createUser (@Req() req: Request):number {
        return this.usersService.createUser(req.body);
    };

    @HttpCode(200)
    @Put(":id")
    updateUser (@Param("id") id: string, @Req() req: Request): number {
        return this.usersService.updateUser({id:Number(id), newData: req.body});
    };

    @HttpCode(200)
    @Delete(":id")
    deleteUser (@Param("id") id: string): number {
        return this.usersService.deleteUser(Number(id))
    };
}
