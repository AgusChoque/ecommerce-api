import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "src/modules/users/entities/User.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()

    @ManyToOne(() => User, (user) => user.orders_id)
    user_id: User
    
    @Column()
    date: string

};