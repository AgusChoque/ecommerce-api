import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class LoginUserDto {
    @ApiProperty({
        description: "User's email address used for login."
    })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: "User's password. Must contain at least one lowercase letter, one uppercase letter, one number, and one special character."
    })
    @IsNotEmpty()
    @IsString()
    @Length(8, 15)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*,.]).+$/,{
        message: "The password must contain one lowercase letter, one uppercase letter, one number, and one special character."
    })
    password: string;
};