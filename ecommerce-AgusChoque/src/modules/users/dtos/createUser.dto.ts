import { IsInt, IsNotEmpty, IsNumber, IsString, Length, Max, Min, Validate } from "class-validator";
import { MatchPassword } from "src/decorators/matchPassword";
import { LoginUserDto } from "src/modules/auth/dtos/loginUser.dto";

export class CreateUserDto extends LoginUserDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 80)
    name: string;

    @IsNotEmpty()
    @IsString()
    @Validate(MatchPassword, ["password"])
    passwordConfirm: string;

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