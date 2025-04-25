import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, Query, SetMetadata, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/User.entity';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateUserDto } from './dtos/createUser.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {};

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @HttpCode(200)
    @Get()
    async getUsers (@Query("page") page: string = "1", @Query("limit") limit: string = "5"):Promise<Omit<User, "password">[]> {
        return await this.usersService.getUsersService(Number(page), Number(limit));
    };

    @HttpCode(200)
    @Get(":id")
    async getUserById (@Param("id", ParseUUIDPipe) id: string): Promise<Omit<User, "password" | "isAdmin">> {
        return await this.usersService.getUserService(id);
    };

    // @SetMetadata("isPublic", true)
    // @HttpCode(201)
    // @Post()
    // async createUser (@Body() user: CreateUserDto): Promise<string> {
    //     return await this.usersService.createUserService(user);
    // };

    @HttpCode(200)
    @Put(":id")
    async updateUser (
        @Param("id", ParseUUIDPipe) id: string,
        @Body() user: CreateUserDto
    ): Promise<string> {
        return await this.usersService.updateUserService(id, user);
    };

    @HttpCode(200)
    @Delete(":id")
    async deleteUser (@Param("id", ParseUUIDPipe) id: string): Promise<string> {
        return await this.usersService.deleteUserService(id);
    };
}
