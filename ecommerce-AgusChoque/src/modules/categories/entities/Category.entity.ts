import { ApiProperty } from "@nestjs/swagger";
import { Product } from "src/modules/products/entities/Product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity({
    name: "CATEGORIES"
})
export class Category {
    @ApiProperty({
        description: 'Unique identifier for the category.',
        example: 'f56e2b58-c9a0-4a9a-9d0e-d8f9715dcbf7',
    })
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()

    @ApiProperty({
        description: 'Name of the category.',
        example: 'Electronics',
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