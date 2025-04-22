import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsString, Length, Matches, Max, Min } from "class-validator";

export class UserDto {
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

    //TODO: Confirmar pass dentro del DTO
    @IsNotEmpty()
    @IsString()
    @Length(8, 15)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
        message: ""
    })
    passConfirmation: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 80)
    address: string;

    @IsNotEmpty()
    @IsNumber()
    @IsInt()
    @Min(1000000000, { message: "The number must be exactly 10 digits long."})
    @Max(9999999999, { message: "The number must be exactly 10 digits long."})
    phone: number;

    @IsString()
    @Length(3, 20)
    country?: string;

    @IsString()
    @Length(5, 20)
    city?: string;
};