import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Order } from "./Order.entity";
import { Product } from "src/modules/products/entities/Product.entity";

@Entity({
    name: "ORDER_DETAILS"
})
export class OrderDetail {
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()

    @Column({
        type: "decimal",
        precision: 10,
        scale: 2,
        nullable: false
    })
    price: number

    @OneToOne(() => Order, (order) => order.orderDetail)
    @JoinColumn({
        name: "order_id"
    })
    order: Order

    @ManyToMany(() => Product, (product) => product.orderDetails)
    @JoinTable({
        name: "ORDER_DETAILS_PRODUCTS"
    })
    products: Product[]

};