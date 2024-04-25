
import { ArrayMaxSize, ArrayMinSize, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { OrderItemDto } from "./order-item.dto";

export class CreateOrderDto {

    // @IsNumber()
    // @IsPositive()
    // totalAmount: number;

    // @IsNumber()
    // @IsPositive()
    // totalItems: number;

    // @IsEnum(OrderStatusList,{
    //     message: `Posible Status values are ${OrderStatusList}`
    // }
    // )
    // @IsOptional()
    // status: OrderStatus = OrderStatus.PENDING;

    // @IsBoolean()
    // @IsOptional()
    // paid: boolean = false;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({each:true})
    @Type(()=> OrderItemDto)
    items: OrderItemDto[]

}
































// import { IsBoolean, IsEnum, IsNumber, IsOptional, IsPositive } from "class-validator";
// import { OrderStatus, OrderStatusList } from "../enum/order.enum";

// export class CreateOrderDto {

//     @IsNumber()
//     @IsPositive()
//     totalAmount: number;

//     @IsNumber()
//     @IsPositive()
//     totalItems: number;

//     @IsEnum(OrderStatusList,{
//         message: `Posible Status values are ${OrderStatusList}`
//     }
//     )
//     @IsOptional()
//     status: OrderStatus = OrderStatus.PENDING;

//     @IsBoolean()
//     @IsOptional()
//     paid: boolean = false;

// }
