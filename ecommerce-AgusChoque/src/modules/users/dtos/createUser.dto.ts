import { IsInt, IsNotEmpty, IsNumber, IsString, Length, Max, Min, Validate } from "class-validator";
import { MatchPassword } from "../../../decorators/matchPassword.decorator";
import { LoginUserDto } from "src/modules/auth/dtos/loginUser.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto extends LoginUserDto {
    @ApiProperty({
        description: "Confirmation of the password. Must match the value of the 'password' field.",
        example: "Password123!"
    })
    @IsNotEmpty()
    @IsString()
    @Validate(MatchPassword, ["password"])
    passwordConfirm: string;

    @ApiProperty({
        description: "Full name of the user.",
        example: "John Smith"
    })
    @IsNotEmpty()
    @IsString()
    @Length(3, 80)
    name: string;

    @ApiProperty({
        description: "User's address.",
        example: "742 Evergreen Terrace, Apt 2B"
    })
    @IsNotEmpty()
    @IsString()
    @Length(3, 80)
    address: string;

    @ApiProperty({
        description: "Contact phone number. Must be exactly 10 digits long.",
        example: 1234567890
    })
    @IsNotEmpty()
    @IsNumber()
    @IsInt()
    @Min(1000000000, { message: "The number must be exactly 10 digits long."})
    @Max(9999999999, { message: "The number must be exactly 10 digits long."})
    phone: number;

    @ApiProperty({
        description: "Country of residence.",
        example: "Argentina"
    })
    @IsNotEmpty()
    @IsString()
    @Length(3, 20)
    country: string;

    @ApiProperty({
        description: "City of residence.",
        example: "Córdoba"
    })
    @IsNotEmpty()
    @IsString()
    @Length(5, 20)
    city: string;
};