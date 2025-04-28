import { ApiProperty, OmitType } from "@nestjs/swagger";
import { User } from "../entities/User.entity";
import { Order } from "src/modules/orders/entities/Order.entity";

export class OrderForUserDto extends OmitType( Order, ["user", "orderDetail"] ) {}

export class AdminResponseDto extends OmitType( User, ["password", "orders"] ) {
    @ApiProperty({ type: () => OrderForUserDto, isArray: true })
    orders: OrderForUserDto[];
};

export class UserResponseDto extends OmitType( AdminResponseDto, ["isAdmin"] ) {}