import { ApiBodyOptions, ApiParamOptions, ApiQueryOptions, ApiResponseOptions, getSchemaPath } from "@nestjs/swagger";
import { CreateUserDto } from "src/modules/users/dtos/createUser.dto";
import { AdminResponseDto, UserResponseDto } from "src/modules/users/dtos/userResponse.dto";

// GET "/users"
// Response
export const getUsersResponse: ApiResponseOptions = {
    status:200,
    description: "Successfully retrieved the list of users.",
    type: AdminResponseDto,
    isArray: true,
    example: [{
        "id": "f2a6d7b3-0de3-4d92-b7b4-5de0d6d42db2",
        "name": "Lucas Fernández",
        "email": "lucas.fernandez@mail.com",
        "phone": "1123456789",
        "address": "Calle 12 Nº345",
        "country": "Argentina",
        "city": "La Plata",
        "isAdmin": false,
        "orders": [
            {
                "id": "2e4d1c56-f83c-41f2-8a84-8fa128c45d63",
                "date": "15/03/2025"
            },
            {
                "id": "5c7ea394-4a94-4059-bdb8-6d24f5ad8f6a",
                "date": "20/04/2025"
            }
        ]
    }, {
        "id": "ec3a18b2-3b20-4ff9-81c3-546c1d5f59d1",
        "name": "María González",
        "email": "maria.gonzalez@mail.com",
        "phone": "1134567890",
        "address": "Av. Siempre Viva 742",
        "country": "Argentina",
        "city": "Córdoba",
        "isAdmin": false,
        "orders": [
            {
            "id": "0ac1278c-4b3e-40ef-8d8d-6b67f20f1b51",
            "date": "01/02/2025"
            }
        ]
    }, {
        "id": "4b983e3e-9145-45ea-99f6-c1b2f401a86b",
        "name": "Santiago López",
        "email": "santiago.lopez@mail.com",
        "phone": "1145678901",
        "address": "Boulevard Mitre 1234",
        "country": "Argentina",
        "city": "Rosario",
        "isAdmin": true,
        "orders": [
            {
            "id": "e4fc4db5-c3d1-48d9-8268-d1b650d6a132",
            "date": "12/05/2025"
            },
            {
            "id": "bd5c612e-7d7c-4f5b-85c1-857e4f9fae14",
            "date": "18/06/2025"
            },
            {
            "id": "47a99e14-063c-4e56-8f48-4567159a14cb",
            "date": "30/06/2025"
            }
        ]
    }, {
        "id": "7ae8d5d3-6397-4f0e-8109-5e4321cc9d7a",
        "name": "Ana Martínez",
        "email": "ana.martinez@mail.com",
        "phone": "1156789012",
        "address": "Ruta 8 Km 42",
        "country": "Argentina",
        "city": "Mendoza",
        "isAdmin": false,
        "orders": [
            {
            "id": "fa3cc5b7-4a6e-4500-80b5-47b82b31d218",
            "date": "07/07/2025"
            }
        ]
    }, {
        "id": "5f8b8e94-c4d4-4d74-b11e-c24a40798c13",
        "name": "Federico Ramírez",
        "email": "federico.ramirez@mail.com",
        "phone": "1167890123",
        "address": "Pasaje Sol 222",
        "country": "Argentina",
        "city": "Salta",
        "isAdmin": false,
        "orders": [
            {
            "id": "843cfe82-1974-407b-8144-6dc6e15d929e",
            "date": "22/08/2025"
            },
            {
            "id": "39d6349b-49c3-4b5d-84fc-f91616f0ad34",
            "date": "25/08/2025"
            }
        ]
    }]
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
    type: UserResponseDto,
    example: {
        "id": "7ae8d5d3-6397-4f0e-8109-5e4321cc9d7a",
        "name": "Ana Martínez",
        "email": "ana.martinez@mail.com",
        "phone": "1156789012",
        "address": "Ruta 8 Km 42",
        "country": "Argentina",
        "city": "Mendoza",
        "orders": [
            {
            "id": "fa3cc5b7-4a6e-4500-80b5-47b82b31d218",
            "date": "07/07/2025"
            }
        ]
    }
};
// Params
export const getUserParam: ApiParamOptions = {
    name: "id",
    description: "Unique identifier of the user to retrieve.",
    example: "e0848972-357e-4486-873c-04e9bbf7f8c6"
};


// PUT "/users/{id}"
// Response
export const updateUserResponse: ApiResponseOptions = {
    status: 200,
    description: "Successfully updated the user. The updated user ID is returned as a string.",
    schema: {
        type: "string",
        example: "ec3a18b2-3b20-4ff9-81c3-546c1d5f59d1"
    }
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
                password: "SimplePass@321",
                passwordConfirm: "SimplePass@321",
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
    schema: {
        type: "string",
        example: "4b983e3e-9145-45ea-99f6-c1b2f401a86b"
    }
};
// Params
export const deleteUserParam: ApiParamOptions = {
    name: "id",
    description: "Unique identifier of the user to delete.",
    example: "e0848972-357e-4486-873c-04e9bbf7f8c6"
};