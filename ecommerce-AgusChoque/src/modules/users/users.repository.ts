import { Injectable } from "@nestjs/common";
import { User } from "./entities/User.entity";

@Injectable()
export class UsersRepository {
    private users: User[] = [
        {
            id: 1,
            email: "juan.perez@example.com",
            name: "Juan Pérez",
            password: "securePass123",
            address: "Calle Falsa 123",
            phone: "+54 11 1234-5678",
            country: "Argentina",
            city: "Buenos Aires"
        },
        {
            id: 2,
            email: "maria.gomez@example.com",
            name: "María Gómez",
            password: "passMaria2024",
            address: "Av. Siempre Viva 742",
            phone: "+34 600 123 456",
            country: "España",
            city: "Madrid"
        },
        {
            id: 3,
            email: "carlos.lopez@example.com",
            name: "Carlos López",
            password: "carlosStrongPass",
            address: "Rua das Palmeiras 55",
            phone: "+55 21 99999-9999",
            country: "Brasil",
            city: "Río de Janeiro"
        },
        {
            id: 4,
            email: "ana.martinez@example.com",
            name: "Ana Martínez",
            password: "AnaPass2024",
            address: "Calle del Sol 789",
            phone: "+52 55 1234-5678",
            country: "México",
            city: "Ciudad de México"
        },
        {
            id: 5,
            email: "luis.rodriguez@example.com",
            name: "Luis Rodríguez",
            password: "LuisSecure99",
            address: "Carrera 45 #12-34",
            phone: "+57 300 456 7890",
            country: "Colombia",
            city: "Bogotá"
        },
        {
            id: 6,
            email: "sofia.fernandez@example.com",
            name: "Sofía Fernández",
            password: "SofiaFernandez1",
            address: "Av. Libertador 321",
            phone: "+54 9 11 6543-2100",
            country: "Argentina",
            city: "Córdoba"
        },
        {
            id: 7,
            email: "diego.torres@example.com",
            name: "Diego Torres",
            password: "TorresDiego77",
            address: "Rua das Flores 77",
            phone: "+55 31 98765-4321",
            country: "Brasil",
            city: "São Paulo"
        },
        {
            id: 8,
            email: "carla.mendez@example.com",
            name: "Carla Méndez",
            password: "CarlaSecure2024",
            address: "Plaza Mayor 10",
            phone: "+34 612 345 678",
            country: "España",
            city: "Barcelona"
        },
        {
            id: 9,
            email: "martin.suarez@example.com",
            name: "Martín Suárez",
            password: "MartinsPass01",
            address: "Calle Central 55",
            phone: "+52 998 765 4321",
            country: "México",
            city: "Guadalajara"
        },
        {
            id: 10,
            email: "valeria.navarro@example.com",
            name: "Valeria Navarro",
            password: "ValeriaN2025",
            address: "Av. Independencia 88",
            phone: "+57 310 987 6543",
            country: "Colombia",
            city: "Medellín"
        }
    ];
    private id = 11;

    find(): User[] {
        return this.users;
    };

    findById(id: number): User {
        const userById: User | undefined = this.users.filter(user => { if(user.id === id) {return user}})[0];
        if(userById) return userById;
        else throw Error("User dont found.");
    };

    create(user: Omit<User, "id">): User {
        const newUser: User = {id: this.id, ...user};
        this.id++;
        return newUser;
    };

    save(newUser: User): void {
        this.users = this.users.filter((user: User) => user.id !== newUser.id);
        this.users.push(newUser);
    };

    delete(id: number): void {
        this.users = this.users.filter((user: User) => user.id !== id);
    };
};