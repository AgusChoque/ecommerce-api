import { ApiBodyOptions, ApiResponseOptions, getSchemaPath } from "@nestjs/swagger";
import { LoginUserDto } from "src/modules/auth/dtos/loginUser.dto";
import { CreateUserDto } from "src/modules/users/dtos/createUser.dto";
import { UserResponseDto } from "src/modules/users/dtos/userResponse.dto";

// GET "/auth"
// Response
export const responseGetAuth: ApiResponseOptions = {
    status: 200,
    description: "Confirmation message: Data successfully retrieved.",
    schema: {
        type: "string",
        example: "Data successfully retrieved."
    }
};


// POST "/auth/signup"
// Response
export const responseSignUpAuth: ApiResponseOptions = {
    status: 201,
    description: "Successfully registered a new user. The created user is returned.",
    type: UserResponseDto,
    example: "5f8b8e94-c4d4-4d74-b11e-c24a40798c13"
};
// Body
export const bodySignUpAuth: ApiBodyOptions = {
    description: "User registration data.",
    schema: {
        oneOf: [{ $ref: getSchemaPath(CreateUserDto) }],
    },
    examples: {
        "Standard User": {
            summary: "John Doe",
            value: {
                email: "john_doe@example.com",
                password: "SecurePass123!",
                passwordConfirm: "SecurePass123!",
                name: "John Doe",
                address: "123 Main St, Apartment 4B",
                phone: 1234567890,
                country: "Argentina",
                city: "Buenos Aires"
            },
        },
        "Woman User": {
            summary: "Alice Smith",
            value: {
                email: "alice.smith@example.com",
                password: "SimplePass.321",
                passwordConfirm: "SimplePass.321",
                name: "Alice Smith",
                address: "42 Elm Street",
                phone: 9876543210,
                country: "USA",
                city: "New York"
            },
        },
        "International User": {
            summary: "Charlie Brown",
            value: {
                email: "charlie.brown@example.fr",
                password: "Ch@rlie2021!",
                passwordConfirm: "Ch@rlie2021!",
                name: "Charlie Brown",
                address: "456 Rue de Paris, Apt. 25",
                phone: 1122334455,
                country: "France",
                city: "Paris"
            },
        },
    }
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
    schema: {
        oneOf: [{ $ref: getSchemaPath(LoginUserDto) }]
    },
    examples: {
        "John Doe": {
            summary: "Login for John Doe",
            value: {
                email: "john_doe@example.com",
                password: "SecurePass123!",
            },
          },
          "Alice Smith": {
              summary: "Login for Alice Smith",
              value: {
                email: "alice.smith@example.com",
                password: "SimplePass.321",
              },
          },
          "Charlie Brown": {
              summary: "Login for Charlie Brown",
              value: {
                email: "charlie.brown@example.fr",
                password: "Ch@rlie2021!",
              },
          },

    }
};