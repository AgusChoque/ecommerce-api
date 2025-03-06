import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsString, Length, Matches } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 80)
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 15)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/,{
        message: ""
    })
    password: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 80)
    adress: string;

    @IsNotEmpty()
    @IsNumber()
    @IsInt()
    phone: number;

    @IsString()
    @Length(5, 20)
    country?: string;

    @IsString()
    @Length(5, 20)
    city?: string;
};