import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Order } from "./Order.entity";
import { Product } from "src/modules/products/entities/Product.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({
    name: "ORDER_DETAILS"
})
export class OrderDetail {
    @ApiProperty({
        description: 'Unique identifier for the order detail.',
        example: 'd8979f5d-c5f8-4cfe-8f53-001c3a2d325d',
    })
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()

    @ApiProperty({
        description: 'Price of the order detail.',
        example: 49.99,
    })
    @Column({
        type: "decimal",
        precision: 10,
        scale: 2,
        nullable: false
    })
    price: number

    @ApiProperty({
        description: 'The order to which this order detail belongs.',
        type: () => Order
    })
    @OneToOne(() => Order, (order) => order.orderDetail)
    @JoinColumn({
        name: "order_id"
    })
    order: Order

    @ApiProperty({
        description: 'List of products included in the order detail.',
        type: () => Product,
        isArray: true
    })
    @ManyToMany(() => Product, (product) => product.orderDetails)
    @JoinTable({
        name: "ORDER_DETAILS_PRODUCTS"
    })
    products: Product[]

};