import { ApiProperty, OmitType, PickType } from "@nestjs/swagger";
import { OrderDetail } from "../entities/OrderDetail.entity";
import { Order } from "../entities/Order.entity";
import { ProductResponseDto } from "src/modules/products/dto/productResponse.dto";

export class CreateOrderDetailsResponseDto extends PickType(OrderDetail, ["id", "price"] ) {};

export class CreateOrderResponseDto extends PickType( Order, ["id", "date"] ) {
    @ApiProperty({ type: () => CreateOrderDetailsResponseDto, isArray: false })
    orderDetail: CreateOrderDetailsResponseDto
};

export class GetOrderDetailResponseDto extends CreateOrderDetailsResponseDto {
    @ApiProperty({ type: () => ProductResponseDto, isArray: true })
    products: ProductResponseDto[]
}

export class GetOrderResponseDto extends OmitType( Order, ["user", "orderDetail"] ) {
    @ApiProperty({ type: () => GetOrderDetailResponseDto, isArray: false })
    orderDetail: GetOrderDetailResponseDto
}