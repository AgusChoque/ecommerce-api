import { IsEmail, IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class LoginUserDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 15)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/,{
        message: "The password must contain one lowercase letter, one uppercase letter, one number, and one special character."
    })
    password: string;
};