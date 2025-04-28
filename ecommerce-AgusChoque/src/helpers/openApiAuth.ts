import { ApiBodyOptions, ApiResponseOptions } from "@nestjs/swagger";
import { LoginUserDto } from "src/modules/auth/dtos/loginUser.dto";
import { CreateUserDto } from "src/modules/users/dtos/createUser.dto";
import { User } from "src/modules/users/entities/User.entity";

// GET "/auth"
// Response
export const responseGetAuth: ApiResponseOptions = {
    status: 200,
    description: "Confirmation message: Data successfully retrieved.",
    type: String
};


// POST "/auth/signup"
// Response
export const responseSignUpAuth: ApiResponseOptions = {
    status: 201,
    description: "Successfully registered a new user. The created user is returned.",
    type: User
};
// Body
export const bodySignUpAuth: ApiBodyOptions = {
    description: "User registration data.",
    type: CreateUserDto
};

// POST "/auth/signin"
// Response
export const responseSignInAuth: ApiResponseOptions = {
    status: 200,
    description: "Successfully signed in. The response contains a JWT token and a confirmation message.",
    schema: {
      properties: {
        token: {
            type: "string",
            description: "JWT token string.",
            example: "jwt.token.string"
        },
        message: {
            type: "string",
            description: "Confirmation message after successful login.",
            example: "Login successful."
        }
      },
      required: ["token", "message"]
    }
};
// Body
export const bodySignInAuth: ApiBodyOptions = {
    description: "User login data.",
    type: LoginUserDto
};