import { Category } from "src/modules/categories/entities/Category.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id:string = uuid()

    @Column({
        nullable: false,
        type: "varchar",
        length: 50
    })
    name: string

    @Column({
        type: "text",
        nullable: false
    })
    description: string

    @Column({
        type: "decimal",
        precision: 10,
        scale: 2,
        nullable: false
    })
    price: number

    @Column({
        type: "int",
        nullable: false
    })
    stock: number

    @Column("text")
    imgUrl: string

    @ManyToOne(() => Category)
    category_id: Category

};