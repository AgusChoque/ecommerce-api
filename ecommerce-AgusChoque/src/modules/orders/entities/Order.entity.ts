import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "src/modules/users/entities/User.entity";
import { OrderDetail } from "./OrderDetail.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({
    name: "ORDERS"
})
export class Order {
    @ApiProperty({
        description: 'Unique identifier for the order.',
        example: '4fef06e0-78b5-47f3-8d56-ff0e7ac2d824'
    })
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()
    
    @ApiProperty({
        description: 'The user who placed the order.',
        type: () => User
    })
    @ManyToOne(() => User, (user) => user.orders)
    @JoinColumn({
        name: "user_id"
    })
    user: User
    
    @ApiProperty({
        description: 'Date when the order was placed.',
        example: '2025-04-25',
    })
    @Column()
    date: string

    @ApiProperty({
        description: 'Details of the order including items and quantities.',
        type: () => OrderDetail
    })
    @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order)
    orderDetail: OrderDetail

};