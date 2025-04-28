import { ApiProperty } from "@nestjs/swagger";
import { Order } from "src/modules/orders/entities/Order.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity({
    name: "USERS"
})
export class User {
    @ApiProperty({
        description: "Unique identifier for the user.",
        example: "550e8400-e29b-41d4-a716-446655440000"
    })
    @PrimaryColumn()
    id:string = uuid()

    @ApiProperty({
        description: "Full name of the user.",
        example: "John Smith"
    })
    @Column({
        nullable: false,
        type: "varchar",
        length: 50
    })
    name: string
    
    @ApiProperty({
        description: "User's unique email address.",
        example: "example@mail.com"
    })
    @Column({
        nullable: false,
        type: "varchar",
        length: 50,
        unique: true
    })
    email: string

    @ApiProperty({
        description: "User's password, stored securely.",
        example: "Password123!"
    })
    @Column({
        nullable: false,
        type: "varchar",
        length: 80
    })
    password: string

    @ApiProperty({
        description: "User's phone number.",
        example: 1234567890
    })
    @Column({
        type: "bigint"
    })
    phone: number
    
    @ApiProperty({
        description: "User's residential address.",
        example: "123 Main St, Apartment 4B"
    })
    @Column("text")
    address: string
    
    @ApiProperty({
        description: "Country where the user resides.",
        example: "Argentina"
    })
    @Column({
        type: "varchar",
        length: 50
    })
    country?: string | undefined
    
    @ApiProperty({
        description: "City where the user resides.",
        example: "Buenos Aires"
    })
    @Column({
        type: "varchar",
        length: 50
    })
    city?: string | undefined
    
    @ApiProperty({
        description: "Indicates if the user is an admin.",
        default: false
    })
    @Column({ default: false })
    isAdmin: boolean

    @ApiProperty({
        description: "List of orders placed by the user.",
        type: () => Order,
        isArray: true
    })
    @OneToMany(() => Order, (order) => order.user)
    @JoinColumn({
        name: "orders_id"
    })
    orders: Order[]

    
};