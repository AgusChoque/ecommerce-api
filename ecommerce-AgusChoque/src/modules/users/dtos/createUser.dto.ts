import { IsInt, IsNotEmpty, IsNumber, IsString, Length, Max, Min, Validate } from "class-validator";
import { MatchPassword } from "../../../decorators/matchPassword.decorator";
import { LoginUserDto } from "src/modules/auth/dtos/loginUser.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto extends LoginUserDto {
    @ApiProperty({
        description: "Confirmation of the password. Must match the value of the 'password' field."
    })
    @IsNotEmpty()
    @IsString()
    @Validate(MatchPassword, ["password"])
    passwordConfirm: string;

    @ApiProperty({
        description: "Full name of the user."
    })
    @IsNotEmpty()
    @IsString()
    @Length(3, 80)
    name: string;

    @ApiProperty({
        description: "User's address."
    })
    @IsNotEmpty()
    @IsString()
    @Length(3, 80)
    address: string;

    @ApiProperty({
        description: "Contact phone number. Must be exactly 10 digits long."
    })
    @IsNotEmpty()
    @IsNumber()
    @IsInt()
    @Min(1000000000, { message: "The number must be exactly 10 digits long."})
    @Max(9999999999, { message: "The number must be exactly 10 digits long."})
    phone: number;

    @ApiProperty({
        description: "Country of residence."
    })
    @IsNotEmpty()
    @IsString()
    @Length(5, 20)
    country: string;

    @ApiProperty({
        description: "City of residence."
    })
    @IsNotEmpty()
    @IsString()
    @Length(5, 20)
    city: string;
};