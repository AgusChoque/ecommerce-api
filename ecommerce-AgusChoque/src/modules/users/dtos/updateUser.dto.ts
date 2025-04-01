import { IsInstance, IsNotEmpty, IsObject, IsString, IsUUID } from "class-validator";
import { CreateUserDto } from "./createUser.dto";

export class UpdateUserDto {
    @IsNotEmpty()
    @IsUUID()
    id: string;

    @IsNotEmpty()
    @IsObject()
    @IsInstance(CreateUserDto)
    newData: CreateUserDto
};