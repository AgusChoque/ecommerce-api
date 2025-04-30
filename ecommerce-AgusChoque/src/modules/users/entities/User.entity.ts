import { ApiProperty } from "@nestjs/swagger";
import { Order } from "src/modules/orders/entities/Order.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity({
    name: "USERS"
})
export class User {
    @ApiProperty({
        description: "Unique identifier for the user."
    })
    @PrimaryColumn()
    id:string = uuid()

    @ApiProperty({
        description: "Full name of the user."
    })
    @Column({
        nullable: false,
        type: "varchar",
        length: 50
    })
    name: string
    
    @ApiProperty({
        description: "User's unique email address."
    })
    @Column({
        nullable: false,
        type: "varchar",
        length: 50,
        unique: true
    })
    email: string

    @ApiProperty({
        description: "User's password, stored securely."
    })
    @Column({
        nullable: false,
        type: "varchar",
        length: 80
    })
    password: string

    @ApiProperty({
        description: "User's phone number."
    })
    @Column({
        type: "bigint"
    })
    phone: number
    
    @ApiProperty({
        description: "User's residential address."
    })
    @Column("text")
    address: string
    
    @ApiProperty({
        description: "Country where the user resides."
    })
    @Column({
        type: "varchar",
        length: 50
    })
    country?: string | undefined
    
    @ApiProperty({
        description: "City where the user resides."
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