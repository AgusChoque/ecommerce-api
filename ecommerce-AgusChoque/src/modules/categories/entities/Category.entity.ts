import { ApiProperty } from "@nestjs/swagger";
import { Product } from "src/modules/products/entities/Product.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity({
    name: "CATEGORIES"
})
export class Category {
    @ApiProperty({
        description: 'Unique identifier for the category.'
    })
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()

    @ApiProperty({
        description: 'Name of the category.'
    })
    @Column({
        type: "varchar",
        length: 50,
        nullable: false,
        unique: true
    })
    name: string

    @ApiProperty({
        description: 'List of products under this category.',
        type: () => Product,
        isArray: true
    })
    @OneToMany(() => Product, (product) => product.category)
    products: Product[]
};