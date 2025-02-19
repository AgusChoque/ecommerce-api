import { Order } from "src/modules/orders/entities/Order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
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
        length: 50
    })
    email: string

    @Column({
        nullable: false,
        type: "varchar",
        length: 20
    })
    password: string

    @Column("int")
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

    @OneToMany(() => Order, (order) => order.user_id)
    orders_id: Order[]
    
};