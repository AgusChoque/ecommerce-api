import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, Query, SetMetadata, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateUserDto } from './dtos/createUser.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { deleteUserParam, deleteUserResponse, getUserParam, getUserResponse, getUsersResponse, limitUsersQuery, pageUsersQuery, updateUserBody, updateUserParam, updateUserResponse } from 'src/helpers/openApiUsers';
import { AdminResponseDto, UserResponseDto } from './dtos/userResponse.dto';
import { OwnUserGuard } from '../auth/guards/ownUser.guard';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard, OwnUserGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {};
    
    // OPEN API
    @ApiOperation({ summary: "Get a list of users by page and amount. You must be an admin." })
    @ApiResponse(getUsersResponse)
    @ApiQuery(pageUsersQuery)
    @ApiQuery(limitUsersQuery)
    // AUTH
    @Roles(Role.Admin)
    // HTTP METHOD
    @HttpCode(200)
    @Get()
    // HANDLER
    async getUsers (@Query("page") page: string = "1", @Query("limit") limit: string = "5"):Promise<AdminResponseDto[]> {
        return await this.usersService.getUsersService(Number(page), Number(limit));
    };

    // OPEN API
    @ApiOperation({ summary: "Get user by ID" })
    @ApiResponse(getUserResponse)
    @ApiParam(getUserParam)
    // HTTP METHOD
    @HttpCode(200)
    @Get(":id")
    // HANDLER
    async getUserById (@Param("id", ParseUUIDPipe) id: string): Promise<UserResponseDto> {
        return await this.usersService.getUserService(id);
    };

    // @SetMetadata("isPublic", true)
    // @HttpCode(201)
    // @Post()
    // async createUser (@Body() user: CreateUserDto): Promise<string> {
    //     return await this.usersService.createUserService(user);
    // };

    // OPEN API
    @ApiOperation({ summary: "Update a user." })
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
    @ApiOperation({ summary: "Delete a user." })
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
