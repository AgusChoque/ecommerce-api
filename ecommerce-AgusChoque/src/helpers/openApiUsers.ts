import { ApiBodyOptions, ApiParamOptions, ApiQueryOptions, ApiResponseOptions, getSchemaPath } from "@nestjs/swagger";
import { CreateUserDto } from "src/modules/users/dtos/createUser.dto";
import { User } from "src/modules/users/entities/User.entity";

// GET "/users"
// Response
export const getUsersResponse: ApiResponseOptions = {
    status:200,
    description: "Successfully retrieved the list of users.",
    type: User,
    isArray: true
};
// Query's
export const pageUsersQuery: ApiQueryOptions = {
    name: "page",
    required: false,
    description: "Page number for paginated results. Defaults to 1 if not provided."
};

export const limitUsersQuery: ApiQueryOptions = {
    name: "limit",
    required: false,
    description: "Maximum number of users to return per page. Defaults to 5 if not provided."
};


// GET "/users/{id}"
// Response
export const getUserResponse: ApiResponseOptions = {
    status: 200,
    description: "Successfully retrieved the user by ID.",
    type: User
};
// Params
export const getUserParam: ApiParamOptions = {
    name: "id",
    description: "Unique identifier of the user to retrieve."
};


// PUT "/users/{id}"
// Response
export const updateUserResponse: ApiResponseOptions = {
    status: 200,
    description: "Successfully updated the user. The updated user ID is returned as a string.",
    type: String
};
// Params
export const updateUserParam: ApiParamOptions = {
    name: "id",
    description: "Unique identifier of the user to update."
};
// Body
export const updateUserBody: ApiBodyOptions = {
    description: "Fields to update for the selected user.",
    required: true,
    schema: {
        oneOf: [{ $ref: getSchemaPath(CreateUserDto) }]
    },
    examples: {
        "John Doe": {
            summary: "Update for John Doe",
            value: {
                email: "john_doe@example.com",
                password: "SecurePass123!",
                passwordConfirm: "SecurePass123!",
                name: "John Doe",
                address: "456 Updated St, Apartment 7A",
                phone: 9876543210,
                country: "Argentina",
                city: "Buenos Aires"
            },
        },
        "Alice Smith": {
            summary: "Update for Alice Smith",
            value: {
                email: "alice.smith@example.com",
                password: "SimplePass.321",
                passwordConfirm: "SimplePass.321",
                name: "Alice Smith",
                address: "43 Elm Street, New York, USA",
                phone: 1122334455,
                country: "USA",
                city: "New York"
            },
        },
        "Charlie Brown": {
            summary: "Update for Charlie Brown",
            value: {
                email: "charlie.brown@example.fr",
                password: "Ch@rlie2021!",
                passwordConfirm: "Ch@rlie2021!",
                name: "Charlie Brown",
                address: "457 Rue de Paris, Apt. 26",
                phone: 6677889900,
                country: "France",
                city: "Paris"
            },
        },
    }
};


// DELETE "/users/{id}"
// Response
export const deleteUserResponse: ApiResponseOptions = {
    status: 200,
    description: "Successfully deleted the user. The deleted user ID is returned as a string.",
    type: String
};
// Params
export const deleteUserParam: ApiParamOptions = {
    name: "id",
    description: "Unique identifier of the user to delete."
};