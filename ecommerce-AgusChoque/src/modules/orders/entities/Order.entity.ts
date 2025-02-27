import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "src/modules/users/entities/User.entity";
import { OrderDetail } from "./OrderDetail.entity";

@Entity({
    name: "ORDERS"
})
export class Order {
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()
    
    @ManyToOne(() => User, (user) => user.orders)
    @JoinColumn({
        name: "user_id"
    })
    user: User
    
    @Column()
    date: string

    @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order)
    orderDetail: OrderDetail

};