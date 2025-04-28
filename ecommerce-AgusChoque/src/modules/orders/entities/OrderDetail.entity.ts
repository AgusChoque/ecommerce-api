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
        description: 'Unique identifier for the order detail.'
    })
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()

    @ApiProperty({
        description: 'Price of the order detail.'
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
        name: "ORDER_DETAILS_PRODUCTS",
        joinColumn: {
            name: "order_detail_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "product_id",
            referencedColumnName: "id"
        }
    })
    products: Product[]

};