
import { ApiProperty } from "@nestjs/swagger";
import { Category } from "src/modules/categories/entities/Category.entity";
import { OrderDetail } from "src/modules/orders/entities/OrderDetail.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity({
    name: "PRODUCTS"
})
export class Product {
    @ApiProperty({
        description: "Unique identifier for the product",
        example: "0d33d24d-121a-4a57-92ee-5c2b867364d5",
      })
    @PrimaryGeneratedColumn("uuid")
    id:string = uuid()

    @ApiProperty({
        description: "Name of the product (must be unique)",
        example: "Wireless Mouse",
      })
    @Column({
        nullable: false,
        type: "varchar",
        length: 50,
        unique: true
    })
    name: string

    @ApiProperty({
        description: "Detailed description of the product",
        example: "An ergonomic wireless mouse with adjustable DPI and long battery life.",
      })
    @Column({
        type: "text",
        nullable: false
    })
    description: string

    @ApiProperty({
        description: "Price of the product in USD",
        example: "49.99",
      })
    @Column({
        type: "decimal",
        precision: 10,
        scale: 2,
        nullable: false
    })
    price: number

    @ApiProperty({
        description: "Number of units available in stock",
        example: 150,
      })
    @Column({
        type: "int",
        nullable: false
    })
    stock: number

    @ApiProperty({
        description: "Image URL of the product in base64 format or a public URL",
        example: "https://res.cloudinary.com/dcuqpgmi5/image/upload/v1745813141/b0nxokfccuaqcvsnudqs.png",
        default: "https://res.cloudinary.com/dcuqpgmi5/image/upload/v1745813141/b0nxokfccuaqcvsnudqs.png"
      })
    @Column({
        type: "text",
        nullable: false
    })
    imgUrl: string = "https://res.cloudinary.com/dcuqpgmi5/image/upload/v1745813141/b0nxokfccuaqcvsnudqs.png"

    @ApiProperty({
        description: "Category to which the product belongs",
        type: () => Category
    })
    @ManyToOne(() => Category, (category) => category.products)
    @JoinColumn({
        name: "category_id"
    })
    category: Category

    @ApiProperty({
        description: "List of order details where this product appears.",
        type: () => OrderDetail,
        isArray: true
    })
    @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
    orderDetails: OrderDetail[]

};