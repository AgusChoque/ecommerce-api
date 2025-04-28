import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, Query, SetMetadata, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/User.entity';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateUserDto } from './dtos/createUser.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { deleteUserParam, deleteUserResponse, getUserParam, getUserResponse, getUsersResponse, limitUsersQuery, pageUsersQuery, updateUserBody, updateUserParam, updateUserResponse } from 'src/helpers/openApiUsers';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {};

    // OPEN API
    @ApiResponse(getUsersResponse)
    @ApiQuery(pageUsersQuery)
    @ApiQuery(limitUsersQuery)
    // AUTH
    @Roles(Role.Admin)
    // HTTP METHOD
    @HttpCode(200)
    @Get()
    // HANDLER
    async getUsers (@Query("page") page: string = "1", @Query("limit") limit: string = "5"):Promise<Omit<User, "password">[]> {
        return await this.usersService.getUsersService(Number(page), Number(limit));
    };

    // OPEN API
    @ApiResponse(getUserResponse)
    @ApiParam(getUserParam)
    // HTTP METHOD
    @HttpCode(200)
    @Get(":id")
    // HANDLER
    async getUserById (@Param("id", ParseUUIDPipe) id: string): Promise<Omit<User, "password" | "isAdmin">> {
        return await this.usersService.getUserService(id);
    };

    // @SetMetadata("isPublic", true)
    // @HttpCode(201)
    // @Post()
    // async createUser (@Body() user: CreateUserDto): Promise<string> {
    //     return await this.usersService.createUserService(user);
    // };

    // OPEN API
    @ApiResponse(updateUserResponse)
    @ApiParam(updateUserParam)
    @ApiBody(updateUserBody)
    // HTTP METHOD
    @HttpCode(200)
    @Put(":id")
    // HANDLER
    async updateUser (
        @Param("id", ParseUUIDPipe) id: string,
        @Body() user: CreateUserDto
    ): Promise<string> {
        return await this.usersService.updateUserService(id, user);
    };

    // OPEN API
    @ApiResponse(deleteUserResponse)
    @ApiParam(deleteUserParam)
    // HTTP METHOD
    @HttpCode(200)
    @Delete(":id")
    // HANDLER
    async deleteUser (@Param("id", ParseUUIDPipe) id: string): Promise<string> {
        return await this.usersService.deleteUserService(id);
    };
}
