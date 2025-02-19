import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Order } from "./Order.entity";
import { Product } from "src/modules/products/entities/Product.entity";

@Entity()
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

    @OneToOne(() => Order)
    @JoinColumn()
    order_id: Order

    @ManyToMany(() => Product)
    @JoinTable()
    products: Product[]

};