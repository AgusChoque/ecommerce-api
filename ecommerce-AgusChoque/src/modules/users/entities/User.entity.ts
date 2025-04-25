import { Order } from "src/modules/orders/entities/Order.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity({
    name: "USERS"
})
export class User {
    @PrimaryGeneratedColumn("uuid")
    id:string = uuid()

    @Column({
        nullable: false,
        type: "varchar",
        length: 50
    })
    name: string
    
    @Column({
        nullable: false,
        type: "varchar",
        length: 50,
        unique: true
    })
    email: string

    @Column({
        nullable: false,
        type: "varchar",
        length: 80
    })
    password: string

    @Column({
        type: "bigint"
    })
    phone: number
    
    @Column("text")
    address: string
    
    @Column({
        type: "varchar",
        length: 50
    })
    country?: string | undefined
    
    @Column({
        type: "varchar",
        length: 50
    })
    city?: string | undefined
    
    @Column({ default: false })
    isAdmin: boolean

    @OneToMany(() => Order, (order) => order.user)
    @JoinColumn({
        name: "orders_id"
    })
    orders: Order[]

    
};