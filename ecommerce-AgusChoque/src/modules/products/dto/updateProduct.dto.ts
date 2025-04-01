import { IsNotEmpty, IsUUID } from "class-validator";

export class updateProductDto {
    @IsNotEmpty()
    @IsUUID()
    id: string

    newData: {
        name: string

        description: string

        price: number

        stock: number

        imgUrl: string
        
    }

};